import { useQuery } from "react-query";
import {PORTS} from './query-keys';
import { ApiConfig, getQuery } from '@oceanvoyapp/api-service';
import {PortDto} from '@oceanvoyapp/dtos';

export function useApiPorts() {
  return useQuery<PortDto[], Error>(PORTS, async () => {
      return getQuery<PortDto[]>(ApiConfig.GET_PORTS());
  });
}
