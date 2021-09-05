import { Injectable } from '@nestjs/common';
import {SearchVesselDto} from '@oceanvoyapp/dtos';
@Injectable()
export class AisService {

  async getListOfAvailableVessels(searchVesselDto: SearchVesselDto): Promise<unknown> {
    return searchVesselDto;
  }

  async uploadAISData():Promise<unknown>{
    return "elma";
  }
}
