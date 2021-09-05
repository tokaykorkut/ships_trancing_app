import { Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Schema()
export class Port extends Document{

  @Prop({type: mongoose.Schema.Types.Mixed,required: false})
  Change: unknown;

  @Prop({type: mongoose.Schema.Types.Mixed,required: false})
  Coordinates: unknown;

  @Prop({required:false})
  Country: string;

  @Prop({required:false})
  Location: string;

  @Prop({required:false})
  Name: string;

  @Prop({required:false})
  NameWoDiacritics: string;

  @Prop({required:false})
  Status: string;

  @Prop({required:false})
  Function: string;

  @Prop({required:false})
  Date: string;

  @Prop({type: mongoose.Schema.Types.Mixed,required: false})
  IATA: unknown;

  @Prop({type: mongoose.Schema.Types.Mixed,required: false})
  Remarks: unknown;

  @Prop({type: mongoose.Schema.Types.Mixed,required: false})
  Subdivision: unknown;
}

export const PortSchema = SchemaFactory.createForClass(Port);
