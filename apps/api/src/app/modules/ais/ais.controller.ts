import { Body, Controller, Post, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MergedVesselListDto, PortDto, SearchVesselDto } from '@oceanvoyapp/dtos';
import { AisService } from './ais.service';

@Controller("ais")
export class AisController {
  constructor(private readonly aisService: AisService){}

  @Get("ports")
  async getPorts():Promise<PortDto[]>{
    return await this.aisService.getPorts();
  }

  @Post("findVessels")
  async getListOfAvailableVessels(
    @Body() searchVesselDto: SearchVesselDto,
  ):Promise<MergedVesselListDto> {
    return await this.aisService.getListOfAvailableVessels(searchVesselDto);
  }

  @Post("uploadFile")
  @UseInterceptors(FileInterceptor(''))
  async uploadAISData(@UploadedFile() file): Promise<unknown>{
    return await this.aisService.uploadAISData(file);
  }

  @Get("vesselsList")
  async getVessels():Promise<MergedVesselListDto>{
    return await this.aisService.getVessels();
  }
}
