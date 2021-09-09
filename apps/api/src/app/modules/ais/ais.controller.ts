import { Body, Controller, Post, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MergedVesselListDto, PortDto, SearchVesselDto } from '@oceanvoyapp/dtos';
import { AisService } from './ais.service';
import { Express } from 'express';
import 'multer';
@Controller("ais")
export class AisController {
  constructor(private readonly aisService: AisService){}

  @Get("list/ports")
  async getPorts():Promise<PortDto[]>{
    return await this.aisService.getPorts();
  }

  @Post("search")
  async getListOfAvailableVessels(
    @Body() searchVesselDto: SearchVesselDto,
  ):Promise<MergedVesselListDto> {
    return await this.aisService.getListOfAvailableVessels(searchVesselDto);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor('',{
    dest:"./uploads"
  }))
  async uploadAISData(@UploadedFile() file: Express.Multer.File, @Body() body): Promise<boolean>{
    return await this.aisService.uploadAISData(file, body);
  }

  @Get("list/vessels")
  async getVessels():Promise<MergedVesselListDto>{
    return await this.aisService.getVessels();
  }
}
