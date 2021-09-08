import { Body, Controller, Post, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MergedVesselListDto, PortDto, SearchVesselDto } from '@oceanvoyapp/dtos';
import { AisService } from './ais.service';

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
  async uploadAISData(@UploadedFile() file): Promise<boolean>{
    console.log(file)
    return await this.aisService.uploadAISData(file);
  }

  @Get("list/vessels")
  async getVessels():Promise<MergedVesselListDto>{
    return await this.aisService.getVessels();
  }
}
