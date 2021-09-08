import { HTTP, HttpMethod } from "./constants";
import {SearchVesselDto} from '@oceanvoyapp/dtos';
export interface ConfigPayload {
  url: string;
  method: HttpMethod;
  payload?: any;
  params?: any;
  dataPath?: string;
  __timestamp?: number;
}

export default {
  // PORTS
  GET_PORTS:():ConfigPayload => ({
    method: HTTP.GET,
    url:'/ais/ports'
  }),
  // VESSEL LCOATIONS
  GET_SEARCH_VESSELS:(payload: SearchVesselDto): ConfigPayload => ({
    method: HTTP.POST,
    url:'/ais/findVessels',
    payload
  })
}

