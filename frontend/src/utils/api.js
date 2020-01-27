import axios from 'axios';

const apiUrl = 'http://localhost:5000';

const login = (email, password) => {
  return axios.post(`${apiUrl}/login`, { email, password });
};

const register = (email, password) => {
  return axios.post(`${apiUrl}/register`, { email, password });
};

const getUsers = () => {
  return axios.get(`${apiUrl}/get-users`);
};

const createNewChat = (users) => {
  return axios.post(`${apiUrl}/create-new-chat`, { users });
};

const getChat = (chatId) => {
  return axios.get(`${apiUrl}/get-chat/${chatId}`);
};

const getOpenChats = (userEmail) => {
  return axios.get(`${apiUrl}/get-open-chats/${userEmail}`)
};

export default { login, register, getUsers, createNewChat, getChat, getOpenChats };