import { ApiConfig, getQuery } from "@oceanvoyapp/api-service";
import { SearchVesselDto } from "@oceanvoyapp/dtos";
import { useMutation, UseMutationOptions } from "react-query";



export function useApiVesselsOfSearch(options?: UseMutationOptions<unknown[], Error, SearchVesselDto>) {
  return useMutation<unknown[], Error, SearchVesselDto>(async (payload) => {
      return getQuery<unknown[]>(ApiConfig.GET_SEARCH_VESSELS({...payload}));
  }, options)
}

