import axios from 'axios';

import { io } from 'socket.io-client';

const axiosOptions = {
  baseURL: 'http://127.0.0.1:5000/api',
};

const apiInstance = axios.create(axiosOptions);

export const getMessages = limit => apiInstance.get(`/messages?limit=${limit}`);

export const createMessage = newMessage =>
  apiInstance.post('/messages', newMessage);

// -------------------------------------------
const socket = io('ws://localhost:5000');
// socket.emit('connection')

export const createMessageWs = message =>
  socket.emit('CREATE_MESSAGE', message);

socket.on('MESSAGE_CREATED', data => {
  console.log('data :>> ', data);
});

socket.on('CREATE_MESSAGE_ERROR', err => {
  console.log('ERROR>>', err);
});

// -------- THEORY + EXAMPLES ---------------------------------
// socket.on('подія',()=>{})  - прослуховувати події ws сервера
// socket.emit('подія', payload) - генерувати події, які прослуховує сервер

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
