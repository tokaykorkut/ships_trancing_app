import {get} from "lodash";
import ApiService from "./api-service";
import {ConfigPayload} from "./api-config";

export async function getQuery<T>({dataPath, ...requestConfig}: ConfigPayload) {
    const {data} = await ApiService.makeRequest(requestConfig);

    return (dataPath ? get(data, dataPath) : data) as T;
}
