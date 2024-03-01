import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Modal from 'react-modal';
import { UserProvider } from './Context/UserContext.jsx';

// Установка элемента приложения для модального окна
Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </UserProvider>,
)
