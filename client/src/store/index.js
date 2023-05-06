import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { bringStoreToSocket } from '../api/index';

const store = configureStore({ reducer: rootReducer });

bringStoreToSocket(store);

export default store;
