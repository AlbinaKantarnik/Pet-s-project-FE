import './navbar.css'
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Logout from './Modal components/Logout';
import ModalToChange from './Modal components/ModalToChange';
import { useUser } from '../Context/UserContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const isAuthenticated = useUser();
    
    const onRequestClose = () => {
        setIsOpen(false);
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    console.log('isAuthenticated:', isAuthenticated.user);
    return (
        <>
            <div className='Navbar'>

                <div className='rightSide'>
                    <ul>
                        <li><Link to='/'>Home</Link></li> 
                        <li><Link to='/search'>Search </Link></li>
                        {isAuthenticated.user.role  && 
                         <>
                        <li><Link to={`/profile/${isAuthenticated.user.user_id}`}>Profile</Link></li>
                        <li><Link to={`/mypets/${isAuthenticated.user.user_id}`}>My Pets </Link></li>
                       
                            {isAuthenticated.user.role === 2 &&
                            <>
                            <li><Link to='/dashbord'>Dashbord </Link></li></>
                        }
                       
                        </>}
                    </ul>
                </div>
                <div className='leftSide'>
                    {isAuthenticated.user.Fname ? (
                        <>
                            <h4>Hi {isAuthenticated.user.Fname}!</h4>
                            <button onClick={handleOpenModal}>Log out</button>
                            <Logout isOpen={isOpen} onRequestClose={onRequestClose} />
                        </>
                    ) : (
                        <>
                            <button onClick={handleOpenModal}>Log in</button>
                            <ModalToChange isOpen={isOpen} onRequestClose={onRequestClose} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
