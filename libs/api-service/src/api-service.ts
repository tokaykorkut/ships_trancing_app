/* eslint-disable no-underscore-dangle */
import Axios from "axios";
import {API_BASEURL, HTTP} from "./constants";
import { RequestConfig } from "./types";


/*
    ApiService is a singleton class and use the same patched axios instance.
 */
class ApiService {
    axiosInstance = Axios.create();
    pendingRequests = new Map();
    config: Record<string, unknown> = {};

    constructor() {
        // patch axios instance.
        this.config = {};
        this.axiosInstance.defaults.timeout = 1800000;
    }

    setConfig(config: Record<string, unknown>) {
        this.config = config;
    }

    setConfigKey(key: string, value: string) {
        this.config[key] = value;
    }

    async makeRequest(requestConfig: Partial<RequestConfig>) {
        const {
            url,
            payload,
            method = HTTP.GET,
            params = {},
            headers = {},
            options = {},
        } = requestConfig;

        try {
            // makeRequestConfig is also added as a key to later use call this method.
            const response = await this.axiosInstance({
                url: `${API_BASEURL}${url}`,
                params,
                data: payload,
                method,
                headers: {
                    ...headers,
                    // Authorization
                },
                ...options,
                requestConfig,
            });

            return response;
        } catch (e) {
            if (!e.response || !e.response.status) {
              throw new Error("Either you are offline or system is down.")
                // console.error("Either you are offline or system is down.");
            }
            const {status, data} = e.response;

            throw new Error("Either you are offline or system is down.")
            console.error(`Something goes wrong, try again later.Status->${status} , data->${data}`);
        }
    }
}

export default new ApiService();
