import React from 'react';
import Modal from "react-modal";
import './Singup.css'
import { fetchPostUserLogout } from '../../API/fetchServer';
import { useUser } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Logout({ isOpen, onRequestClose }) {
    const {logoutUser} = useUser();
    const isAuthenticated = useUser();
    const navigate = useNavigate();

    const handleUserLogout = async () => {
        // try {
        //     const responseData = await fetchPostUserLogout();
        //     return responseData;
        // } catch (error) {
        //     console.error('Error:', error);
        // }
        logoutUser();
        navigate('/');
        onRequestClose();
    };
    
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <div className='logout'>

                <div className='singupTable'>
                    <label>
                        <h4>Dear {isAuthenticated.user.Fname} {isAuthenticated.user.Lname}</h4>
                        {/* <p>User ID: {user.userId}</p>
                        <p>First Name: {user.firstName}</p>
                        <p>Last Name: {user.lastName}</p>
                        <p>Role: {user.role}</p> */}
                        <h3>You really want to log out?</h3></label>


                    <div className='singupTable__btn'>
                        <button onClick={handleUserLogout} type='button'>{'Yes'}</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}