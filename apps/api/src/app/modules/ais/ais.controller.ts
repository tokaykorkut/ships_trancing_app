import { Body, Controller, Post, Get } from '@nestjs/common';
import { SearchVesselDto } from '@oceanvoyapp/dtos';
import { AisService } from './ais.service';

@Controller('ais')
export class AisController {
  constructor(private readonly aisService: AisService){}

  @Post("findVessels")
  async getListOfAvailableVessels(
    @Body() searchVesselDto: SearchVesselDto,
  ):Promise<unknown> {
    return await this.aisService.getListOfAvailableVessels(searchVesselDto);
  }

  @Get("uploadFile")
  async uploadAISData():Promise<unknown>{
    return await this.aisService.uploadAISData();
  }
}
