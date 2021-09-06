import { Body, Controller, Post, Get } from '@nestjs/common';
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

  @Get("uploadFile")
  async uploadAISData():Promise<unknown>{
    return await this.aisService.uploadAISData();
  }
}
