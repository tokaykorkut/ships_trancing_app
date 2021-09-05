import {Document, model, Model, Schema} from 'mongoose';

interface IPorts extends Document{
  Change?: string | unknown;
  Coordinates?: string | unknown;
  Country?: string;
  Location?: string;
  Name?: string;
  NameWoDiacritics?: string;
  Status?: string;
  Function?: string;
  Date?: string;
  IATA?: string | unknown;
  Remarks?: string | unknown;
  Subdivision?: string | unknown;
}

const PortSchema: Schema = new Schema({
  Change: {type: String , required: false},
  Coordinates: {type: String , required: false},
  Country: {type: String , required: false},
  Location: {type: String , required: false},
  Name: {type: String , required: false},
  NameWoDiacritics: {type: String , required: false},
  Status: {type: String , required: false},
  Function: {type: String , required: false},
  Date: {type: String , required: false},
  IATA: {type: String , required: false},
  Remarks: {type: String , required: false},
  Subdivision: {type: String , required: false},
})

const Port: Model<IPorts> = model('Port', PortSchema);

export default Port;
