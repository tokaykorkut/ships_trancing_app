import {Document, model, Model, Schema} from 'mongoose';

interface ILocations extends Document{
  A?: number;
  B?: number;
  C?: number;
  D?: number;
  MMSI?: number;
  TIME?: string;
  LONGITUDE?: number;
  LATITUDE?: number;
  COG?: number;
  SOG?: number;
  HEADING?: number;
  ROT?: number;
  NAVSTAT?: number;
  IMO?: number;
  NAME?: string;
  CALLSIGN?: string;
  TYPE?: number;
  DRAUGHT?: number;
  DEST?: string;
  ETA?: string | unknown;
}

const LocationSchema: Schema = new Schema({
  A: {type: Number, required:false},
  B: {type: Number, required:false},
  C: {type: Number, required:false},
  D: {type: Number, required:false},
  MMSI: {type: Number, required:false},
  TIME: {type: String, required:false},
  LONGITUDE: {type: Number, required:false},
  LATITUDE: {type: Number, required:false},
  COG: {type: Number, required:false},
  SOG: {type: Number, required:false},
  HEADING: {type: Number, required:false},
  ROT: {type: Number, required:false},
  NAVSTAT: {type: Number, required:false},
  IMO: {type: Number, required:false},
  NAME: {type: String, required:false},
  CALLSIGN: {type: String, required:false},
  TYPE: {type: Number, required:false},
  DRAUGHT: {type: Number, required:false},
  DEST: {type: String, required:false},
  ETA: {type: String, required:false},
})

const Location: Model<ILocations> = model('Location', LocationSchema);

export default Location;
