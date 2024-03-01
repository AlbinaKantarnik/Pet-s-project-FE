import './Home.css'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useUser } from '../Context/UserContext';

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useUser();
  const ToSearchPage = (e) => {
    navigate('/search')
  }

  return (
    <>
      <div className="home-container">
        <div className='home-content'>
          {isAuthenticated.user.Fname && <p><i>Welcome {isAuthenticated.user.Fname}!</i></p>}
          <h1>We help you to adopt pet</h1>
          <h4>Are you ready to welcome your new best friend into your life?</h4>
          <button onClick={ToSearchPage}>Start search</button>
          {!isAuthenticated.user.Fname && <p><i>To use full functions please Login or Singup</i></p>}
        </div>
      </div>
    </>
  )
}