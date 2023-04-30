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

// socket.on('подія',()=>{})  - прослуховувати події ws сервера
// socket.emit('подія', payload) - генерувати події, які прослуховує сервер
