import React, { useState } from 'react';
import Modal from "react-modal";
import Login from './Login';
import Singup from './Singup';
import './Singup.css';

export default function ModalToChange({ isOpen, onRequestClose }) {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>

        <div className='modalButtons'>
          <button className={activeTab === 'login' ? 'active-button' : 'inactive-button'} onClick={() => handleTabChange('login')}>Log in</button>
          <button className={activeTab === 'signup' ? 'active-button' : 'inactive-button'} onClick={() => handleTabChange('signup')}>Sign up</button>
        </div>

        {activeTab === 'login' && <Login isOpen={isOpen} onRequestClose={onRequestClose}/>}
        {activeTab === 'signup' && <Singup isOpen={isOpen} onRequestClose={onRequestClose}/>}

      </Modal>
    </>
  );

}