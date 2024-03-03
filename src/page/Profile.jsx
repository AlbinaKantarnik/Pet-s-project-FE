import { fetchGetUserById } from '../API/fetchServer';
import { useUser } from '../Context/UserContext';
import Loading from '../components/Loading';
import ProfileTable from '../components/ProfileTable'
import './Profile.css'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { id_user } = useParams();
  const [userData, setUserData] = useState(null);
  const isAuthenticated = useUser();
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchGetUserById(id_user);
        setUserData(response[0]);
      } catch (error) {
        console.error('Error fetching to user page:', error);
      }
    };
    
    fetchUserData();
  }, [id_user]);

  if (!isAuthenticated.user.Fname) {
    return <Loading/>
}
  if (!userData) {
    return <Loading/>
  }
  
  return (
    <>
      <div className="profile-container">
        <div className='profile-content'>
        <h1>Profile</h1>
       <ProfileTable id_user={id_user} userData={userData} setUserData={setUserData}/>
        </div>
      </div>
      </>
    )
}