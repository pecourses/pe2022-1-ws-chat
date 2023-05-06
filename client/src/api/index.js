import axios from 'axios';

import { io } from 'socket.io-client';
import {
  createMessageError,
  createMessageFullfilled,
} from '../store/slices/messagesSlice';

const axiosOptions = {
  baseURL: 'http://127.0.0.1:5000/api',
};

const apiInstance = axios.create(axiosOptions);

export const getMessages = limit => apiInstance.get(`/messages?limit=${limit}`);

// -------------------------------------------
const socket = io('ws://localhost:5000');
// socket.emit('connection')

export const createMessageWs = message =>
  socket.emit('CREATE_MESSAGE', message);

export const bringStoreToSocket = store => {
  socket.on('MESSAGE_CREATED', data => {
    store.dispatch(createMessageFullfilled(data));
  });

  socket.on('CREATE_MESSAGE_ERROR', err => {
    store.dispatch(createMessageError(err));
  });
};

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
