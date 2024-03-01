import React, { useEffect, useState } from 'react';
import './SaveMassage.css'

const SaveMassage = ({ success, error }) => {
    const [visible, setVisible] = useState(false);
    const [saveMessage, setSaverMessage] = useState('');
  
    useEffect(() => {
      // console.log('success', success)
      // console.log('error', error)
        if (success || error) {
          setVisible(true);
          setSaverMessage(success ? 'Data saved successfully!' : error);
          const timer = setTimeout(() => {
            setVisible(false);
          },3000 ); 
          return () => clearTimeout(timer);
        }
      }, [success, error]);
  
    if (!visible) {
      return null; // Не отображать компонент, если visible === false
    }

  return (
    <div className={`save-message ${success ? 'success' : 'error'}`}>
    <div className="message-content">
      <h4>{saveMessage}</h4>
      <button onClick={() => setVisible(false)}>Close</button>
    </div>
  </div>
  );
};

export default SaveMassage;