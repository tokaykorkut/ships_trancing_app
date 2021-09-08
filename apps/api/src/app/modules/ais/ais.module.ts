import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AisController } from './ais.controller';
import { AisService } from './ais.service';
import {PortSchema, LocationSchema, TempLocation, TempLocationSchema} from '@oceanvoyapp/database';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Location',schema:LocationSchema},
    {name:'Port',schema:PortSchema},
    {name:'TempLocation', schema:TempLocationSchema}
  ])],
  controllers:[AisController],
  providers:[AisService]
})
export class AisModule {}
