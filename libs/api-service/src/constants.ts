export const HTTP = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const API_BASEURL =  "http://localhost:4000";


type HttpKeys = keyof typeof HTTP;
export type HttpMethod = typeof HTTP[HttpKeys];
