import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class TempLocation extends Document {

  @Prop({type: mongoose.Schema.Types.Mixed,required: false})
  oilVesselsToDestination: unknown[];

  @Prop({type: mongoose.Schema.Types.Mixed,required: false})
  idleOilVessels: unknown[];
}


export const TempLocationSchema = SchemaFactory.createForClass(TempLocation);
