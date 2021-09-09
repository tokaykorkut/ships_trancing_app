import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Port, Location, TempLocation} from '@oceanvoyapp/database';
import { MergedVesselListDto, PortDto, SearchVesselDto} from '@oceanvoyapp/dtos';
import { Model } from 'mongoose';
import * as turf from '@turf/turf';
import * as fs from 'fs';
import { Express } from 'express';
import 'multer';

@Injectable()
export class AisService {
constructor(
  @InjectModel('Port') private portModel: Model<Port>,
  @InjectModel('Location') private locationModel: Model<Location>,
  @InjectModel('TempLocation') private tempLocationModel: Model<TempLocation>,
  ) {}

  async getPorts(): Promise<PortDto[]>{
    const ports = await this.portModel.find({Function:{$regex:"1"}, Coordinates:{$exists:true}}).limit(100);
    return ports;
  }

  async convertDDM2DD(portCoordinates: string):Promise<number[]>{
    const DMlist = portCoordinates.split(" ");

    const DDlist =  DMlist.map((item)=>{
      const temp = item.split("");
      let degree;
      let min;
      const direction = temp.pop();

      if(temp.length === 4){
        degree = temp[0]+temp[1];
        min = temp[2]+temp[3];
        return direction === 'N' ? parseFloat((parseInt(degree)+(parseInt(min)/60)).toFixed(6)) : parseFloat((-1*(parseInt(degree)+(parseInt(min)/60))).toFixed(6));
      }
      degree = temp[0] + temp[1] + temp[2];
      min = temp[3] + temp[4];
      return direction === 'E' ? parseFloat((parseInt(degree)+(parseInt(min)/60)).toFixed(6)) : parseFloat((-1*(parseInt(degree)+(parseInt(min)/60))).toFixed(6));
    })

    // DDlist = [ latitude, longitude ]
    return DDlist;
  }


  async getListOfAvailableVessels(searchVesselDto: SearchVesselDto): Promise<MergedVesselListDto> {

    const portLocation = await this.portModel.findOne({
      Name:searchVesselDto.port,
      Location:searchVesselDto.portLocation,
      Country:searchVesselDto.portCountry,
      Coordinates:{$exists:true}
    });

    if(!portLocation || !portLocation?.Coordinates){
      throw new HttpException("Content does not exists!", HttpStatus.NOT_FOUND);
    }

    // convert coordinates data from Decimal Minutes to Decimal Degreee
    const portDD = await this.convertDDM2DD(portLocation.Coordinates.toString());
    // create Destination Port Point to calculate KM range filter
    const portPoint = turf.point([portDD[1],portDD[0]])
    const portNameShort = searchVesselDto.port.slice(0,3).toUpperCase();

    const tempOilVesselsToDestination = await this.locationModel.find({
      TYPE:{$gte:80,$lte:89},
      ETA:{$gte:searchVesselDto.beginDate,$lte:searchVesselDto.endDate},
      $or: [
        {DEST:searchVesselDto.port},
        {DEST:{$regex:`${searchVesselDto.port}`}},
        {DEST:`${searchVesselDto.portCountry} ${searchVesselDto.portLocation}`},
        {DEST:`${searchVesselDto.portCountry}${searchVesselDto.portLocation}`},
        {DEST:`${searchVesselDto.portLocation}`},
        {DEST:{$regex:`${searchVesselDto.portCountry}${searchVesselDto.portLocation}`}},
        {DEST:{$regex:`${searchVesselDto.portCountry} ${searchVesselDto.portLocation}`}},
        {DEST:{$regex:`${searchVesselDto.portCountry}-${searchVesselDto.portLocation}`}},
        {DEST:{$regex:`${searchVesselDto.portCountry}===${searchVesselDto.port.toUpperCase()}`}},
        {DEST:{$regex:`${portNameShort}`}}
      ]
    }).limit(100);


    // eslint-disable-next-line prefer-const
    let oilVesselsToDestination = [] as Location[];

    if(tempOilVesselsToDestination.length !== 0){
      tempOilVesselsToDestination.forEach((vessel)=>{
        const vesselPoint = turf.point([vessel.LONGITUDE, vessel.LATITUDE]);
        const diff = turf.rhumbDistance(vesselPoint,portPoint,{units:'kilometers'});
        if(diff<=searchVesselDto.distance){
          vessel.pointCoor = turf.point([vessel.LONGITUDE, vessel.LATITUDE])
          oilVesselsToDestination.push(vessel);
        }
      })
    }
    // eslint-disable-next-line prefer-const
    let idleOilVessels = [] as Location[];

    if(searchVesselDto.idle === true){
      const tempIdleOilVessels = await this.locationModel.find({
        ETA:null,
        $or: [{DEST:null},{DEST:""}],
        // TODO: time format issue ask to Daniel
        // TIME:{$gte:searchVesselDto.beginDate,$lte:searchVesselDto.endDate},
      }).limit(100);

      if(tempIdleOilVessels.length !== 0){
        tempIdleOilVessels.forEach((vessel)=>{
          const vesselPoint = turf.point([vessel.LONGITUDE, vessel.LATITUDE]);
          const diff = turf.rhumbDistance(vesselPoint,portPoint,{units:'kilometers'});
          if(diff<=searchVesselDto.distance){
            vessel.pointCoor = turf.point([vessel.LONGITUDE, vessel.LATITUDE])
            idleOilVessels.push(vessel);
          }
        })
      }
    }

    await this.tempLocationModel.deleteMany();
    const tempData = new this.tempLocationModel({oilVesselsToDestination, idleOilVessels});
    await tempData.save();

    return {oilVesselsToDestination, idleOilVessels};
  }

  async getVessels(): Promise<MergedVesselListDto>{
    return await this.tempLocationModel.findOne() || {} as MergedVesselListDto;
  }


  async uploadAISData(file: Express.Multer.File): Promise<string>{
    if(file.mimetype==='application/octet-stream'){
      const objRead = JSON.parse(fs.readFileSync(file.path.toString(), {encoding: 'utf-8'}));
      objRead.forEach(async(item) => {
        await this.locationModel.findOneAndUpdate({
          ...item
        },
        {
          upsert:true
        })
      });
      fs.unlinkSync(file.path);
      return 'SUCCESSFULLY UPDATED!';
    }
    fs.unlinkSync(file.path);
    return 'FAILED!';
    }

}
