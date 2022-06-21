import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MainLayout from './Components/mainLayout/mainLayout';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ToggleColorMode from './Components/mainLayout/toggleColorMode';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainLayout/>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
