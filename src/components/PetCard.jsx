import React, { useState } from 'react';
import './PetCard.css'
import { AdoptIcon } from '../Elements/Icon/AdoptIcon';
import { TimeIcon } from '../Elements/Icon/TimeIcon';
import { FavoriteIcon } from '../Elements/Icon/FavoriteIcon';
import { Link } from 'react-router-dom';
import Loading from './Loading';


export default function PetCard({ petData }) {
    const [showAdoptIcon, setShowAdoptIcon] = useState(true);
    const [showTimeIcon, setShowTimeIcon] = useState(true);
    
    if (!petData) {
        return <Loading />
    }

    const adoptIconClass = petData.pet_status === 1 ? 'activeIcon' : 'defaultIcon';
    const timeIconClass = petData.pet_status === 2 ? 'activeIcon' : 'defaultIcon';
    const favoriteIconClass = petData.saved_pet === 1 ? 'activeIcon' : 'defaultIcon';

    const handleAdoptIconClick = () => {
        console.log('Adopt icon clicked');
        setShowTimeIcon(false);
        
        // Отправить запрос на сервер для обновления статуса питомца и обновить карточку
    };

    const handleTimeIconClick = () => {
        console.log('Time icon clicked');
        setShowAdoptIcon(false);
       
        // Отправить запрос на сервер для обновления статуса питомца и обновить карточку
    };

    const handleFavoriteIconClick = () => {
        console.log('Favorite icon clicked');
    }

    return (
        <>
            <div className='Container'>
                <div className='Card' style={{ width: '16rem' }}>
                    <div className='CardTitle'><h4>My name is {petData.name}</h4></div>
                    <div className='CardImg' style={{ backgroundImage: `url(${petData.picture})` }} />
                    <div className='CardBody'>
                        <div className='CardText' >
                            <h5>I'm a {petData.type}</h5>
                            <h5>Height: {petData.height} sm</h5>
                            <h5>Weight: {petData.weight} kg</h5>
                        </div>
                        <button>
                            <Link to={`/pets/${petData.id}`}>Learn more</Link>
                        </button>

                        <div className='IconCard'>
                            {showAdoptIcon && <AdoptIcon className={adoptIconClass} onClick={handleAdoptIconClick}/>}
                            {showTimeIcon && <TimeIcon className={timeIconClass} onClick={handleTimeIconClick}/>}
                            <FavoriteIcon className={favoriteIconClass} onClick={handleFavoriteIconClick}/>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}