import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AisController } from './ais.controller';
import { AisService } from './ais.service';
import {Port, Location} from '@oceanvoyapp/database';

@Module({
  imports:[MongooseModule.forFeature([Location, Port])],
  controllers:[AisController],
  providers:[AisService]
})
export class AisModule {}
