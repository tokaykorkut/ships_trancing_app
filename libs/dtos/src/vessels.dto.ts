import {IsBoolean, IsString} from 'class-validator';

export class SearchVesselDto {
  @IsString()
  port!: string;

  @IsString()
  distance!: number;

  @IsString()
  beginDate!: string;

  @IsString()
  endDate!:string;

  @IsBoolean()
  idle!: boolean;


}
