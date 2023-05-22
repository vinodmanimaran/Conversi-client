import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './state/api';

// Configure the Redux store
const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

// Set up listeners for Redux Toolkit Query
setupListeners(store.dispatch);

// Render the app
ReactDOM.render(
  // Provide the Redux store to the app
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
