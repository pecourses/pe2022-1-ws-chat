import axios from 'axios';
// 1
import { io } from 'socket.io-client';

const axiosOptions = {
  baseURL: 'http://127.0.0.1:5000/api',
};

const apiInstance = axios.create(axiosOptions);

export const getMessages = limit => apiInstance.get(`/messages?limit=${limit}`);

export const createMessage = newMessage =>
  apiInstance.post('/messages', newMessage);

// -------
const socket = io('ws://localhost:5000');
// socket.emit('connection')

socket.on('ADD_NEW_MEMBER', payload => {
  console.log('ADD_NEW_MEMBER');
  console.log('payload :>> ', payload);
});

socket.on('NEW_USER_WELLCOME', payload => {
  console.log('payload :>> ', payload);
});

socket.on('EVENT_FOR_ALL', payload => {
  console.log('payload :>> ', payload);
});
// socket.on('подія',()=>{})  - прослуховувати події ws сервера
// socket.emit('подія', payload) - генерувати події, які прослуховує сервер
