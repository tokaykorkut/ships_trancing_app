import { ApiConfig, getQuery } from "@oceanvoyapp/api-service";
import { MergedVesselListDto, SearchVesselDto } from "@oceanvoyapp/dtos";
import { useMutation, UseMutationOptions, useQuery } from "react-query";
import { SEARCH_LOCATIONS } from "./query-keys";



export function useApiVesselsOfSearch(options?: UseMutationOptions<unknown[], Error, SearchVesselDto>) {
  return useMutation<unknown[], Error, SearchVesselDto>(async (payload) => {
      return getQuery<unknown[]>(ApiConfig.GET_SEARCH_VESSELS({...payload}));
  }, options)
}

export function useApiGetVesselsList() {
  return useQuery<MergedVesselListDto, Error>(SEARCH_LOCATIONS, async () => {
      return getQuery<MergedVesselListDto>(ApiConfig.GET_VESSELS_LIST());
  })}
