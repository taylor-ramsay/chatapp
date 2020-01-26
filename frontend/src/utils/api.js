import axios from 'axios';

const apiUrl = 'http://localhost:5000';

const login = (email, password) => {
  return axios.post(`${apiUrl}/login`, { email, password });
};

const register = (email, password) => {
  return axios.post(`${apiUrl}/register`, { email, password });
};

export default { login, register };