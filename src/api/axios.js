import axios from "axios";
const baseUrl = "http://raspberrypi.local:3001";

const getResource = (resource) => {
  const request = axios.get(`${baseUrl}/${resource}`);
  return request.then((response) => response.data);
};

const create = (resource, newObject) => {
  const request = axios.post(`${baseUrl}/${resource}`, newObject);
  return request.then((response) => response.data);
};

const update = (resource, newObject) => {
  const request = axios.put(`${baseUrl}/${resource}`, newObject);
  return request.then((response) => response.data);
};

const remove = (resource, id) => {
  const request = axios.delete(`${baseUrl}/${resource}/${id}`);
  return request.then((response) => response.data);
};

export default { getResource, create, update, remove };
