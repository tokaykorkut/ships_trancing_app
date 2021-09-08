import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
@Schema()
export class Location extends Document{

  @Prop({required:false})
  A: number;

  @Prop({required:false})
  B: number;

  @Prop({required:false})
  C: number;

  @Prop({required:false})
  D: number;

  @Prop({required:false})
  MMSI: number;

  @Prop({required:false})
  TIME: string;

  @Prop({required:false})
  LONGITUDE: number;

  @Prop({required:false})
  LATITUDE: number;

  @Prop({required:false})
  COG: number;

  @Prop({required:false})
  SOG: number;

  @Prop({required:false})
  HEADING: number;

  @Prop({required:false})
  ROT: number;

  @Prop({required:false})
  NAVSTAT: number;

  @Prop({required:false})
  IMO: number;

  @Prop({required:false})
  NAME: string;

  @Prop({required:false})
  CALLSIGN: string;

  @Prop({required:false})
  TYPE: number;

  @Prop({required:false})
  DRAUGHT: number;

  @Prop({required:false})
  DEST: string;

  @Prop({type: mongoose.Schema.Types.Mixed,required:false})
  ETA: unknown;

  @Prop({type: mongoose.Schema.Types.Mixed,required:false})
  pointCoor: unknown;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
