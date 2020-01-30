import axios from 'axios';

const apiUrl = 'http://localhost:8080';

const login = (email, password) => {
  return axios.post(`${apiUrl}/login`, { email, password });
};

const logout = (userId) => {
  return axios.post(`${apiUrl}/logout`, { userId });
};

const register = (email, password) => {
  return axios.post(`${apiUrl}/register`, { email, password });
};

const getUsers = () => {
  return axios.get(`${apiUrl}/get-users`);
};

const createNewChatGroup = (users) => {
  return axios.post(`${apiUrl}/create-new-chat-group`, { users });
};

const getChat = (chatId) => {
  return axios.get(`${apiUrl}/get-chat/${chatId}`);
};

const getChatGroups = (userEmail) => {
  return axios.get(`${apiUrl}/get-chat-groups/${userEmail}`)
};

const patchChatWithNewMessage = (chatId, msg, fromEmail) => {
  return axios.patch(`${apiUrl}/patch-chat`, { chatId, msg, fromEmail });
};

export default { login, register, getUsers, createNewChatGroup, getChat, getChatGroups, patchChatWithNewMessage, logout };