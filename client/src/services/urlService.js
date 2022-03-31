import http from "./httpService";

const apiEndpoint = `${process.env.REACT_APP_BASE_URL}/api/v1/urls`;
// const apiEndpoint = "http://localhost:8000/api/v1/urls";

export const createUrl = (url) => http.post(apiEndpoint, url);

export const getUrl = (code) => http.get(`${apiEndpoint}/${code}`);

export const deleteUrl = (id) => http.delete(`${apiEndpoint}/${id}`);

export const getUrls = () => http.get(apiEndpoint);

export const updateUrl = (id, url) => http.patch(`${apiEndpoint}/${id}`, url);
