import { IsString } from "class-validator";

export class PortDto{

  Coordinates?: unknown;

  Change?: unknown;

  @IsString()
  Country?: string;

  @IsString()
  Location?: string;

  @IsString()
  Name?: string;

  @IsString()
  NameWoDiacritics?: string;

  @IsString()
  Status?: string;

  @IsString()
  Function?: string;

  @IsString()
  Date?: string;

  IATA?: unknown;

  Remarks?: unknown;

  Subdivision?: unknown;

  id?: string | number  | undefined;
}
