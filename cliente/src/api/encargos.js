import axios from "axios";
const URL = "http://localhost:8000";
const endpoint = `${URL}/api/encargos`;

export const fetchEncargos = () => axios.get(endpoint);

export const fetchEncargo = (id) => axios.get(`${endpoint}/${id}`);

export const createEncargo = (newEncargo) => axios.post(endpoint, newEncargo);

export const updateEncargo = (id, encargo) => axios.put(`${endpoint}/${id}`, encargo);

export const deleteEncargo = (id) => axios.delete(`${endpoint}/${id}`);