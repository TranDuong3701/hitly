import http from "./httpService";

const apiEndpoint = "http://18.139.117.2:8000/api/v1/urls";

export const createUrl = (url) => http.post(apiEndpoint, url);

export const getUrl = (code) => http.get(`${apiEndpoint}/${code}`);

export const deleteUrl = (id) => http.get(`${apiEndpoint}/${id}`);

export const getUrls = () => http.get(apiEndpoint);

export const updateUrl = (id, url) => http.patch(`${apiEndpoint}/${id}`, url);
