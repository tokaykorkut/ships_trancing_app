import {IsBoolean, IsString, IsNumber, IsArray, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';
export class SearchVesselDto {
  @IsString()
  port!: string;

  @IsString()
  portLocation!: string;

  @IsString()
  portCountry!: string;

  @IsString()
  distance!: number;

  @IsString()
  beginDate!: string;

  @IsString()
  endDate!:string;

  @IsBoolean()
  idle!: boolean;

}

export class LocationDto {
  @IsNumber()
  A?: number;

  @IsNumber()
  B?: number;

  @IsNumber()
  C?: number;

  @IsNumber()
  D?: number;

  @IsNumber()
  MMSI?: number;

  @IsString()
  TIME?: string;

  @IsNumber()
  LONGITUDE?: number;

  @IsNumber()
  LATITUDE?: number;

  @IsNumber()
  COG?: number;

  @IsNumber()
  SOG?: number;

  @IsNumber()
  HEADING?: number;

  @IsNumber()
  ROT?: number;

  @IsNumber()
  NAVSTAT?: number;

  @IsNumber()
  IMO?: number;

  @IsString()
  NAME?: string;

  @IsString()
  CALLSIGN?: string;

  @IsNumber()
  TYPE?: number;

  @IsNumber()
  DRAUGHT?: number;

  @IsNumber()
  DEST?: string;

  ETA?: unknown;
}


export class MergedVesselListDto {
  @IsArray()
  @ValidateNested()
  @Type(()=> LocationDto)
  oilVesselsToDestination!: LocationDto[];

  @IsArray()
  @ValidateNested()
  @Type(()=> LocationDto)
  idleOilVessels!: LocationDto[];
}
