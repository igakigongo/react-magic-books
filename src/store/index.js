import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import booksReducer from '../reducers/books';
import filterReducer from '../reducers/filter';

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
