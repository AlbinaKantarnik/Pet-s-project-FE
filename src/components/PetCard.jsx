import React, { useEffect, useState } from 'react';
import './PetCard.css'
import { AdoptIcon } from '../Elements/Icon/AdoptIcon';
import { TimeIcon } from '../Elements/Icon/TimeIcon';
import { FavoriteIcon } from '../Elements/Icon/FavoriteIcon';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { fetchDeletePetReturn, fetchDeletePetUnsave, fetchPutPetAdopt, fetchPutPetSave } from '../API/fetchServer';
import SaveMassage from '../Elements/Usefull/SaveMassage';
import { useUser } from '../Context/UserContext';
import ModalToChange from './Modal components/ModalToChange';


export default function PetCard({ petData }) {
    const isAuthenticated = useUser();
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [showAdoptIcon, setShowAdoptIcon] = useState(true);
    const [showTimeIcon, setShowTimeIcon] = useState(true);
    const [adoptIconClass, setAdoptIconClass] = useState('');
    const [timeIconClass, setTimeIconClass] = useState('');
    const [favoriteIconClass, setFavoriteIconClass] = useState('');
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    if (!petData) {
        return <Loading />
    }

    const savedUserIdsArray = petData.saved_user_ids ? petData.saved_user_ids.split(',').map(userId => parseInt(userId)) : [];
    
    useEffect(() => {
        if (petData) {
            setAdoptIconClass(petData.pet_status === 1 ?'activeIcon' : 'defaultIcon');
            setTimeIconClass(petData.pet_status === 2 ? 'activeIcon' : 'defaultIcon');
            setFavoriteIconClass(savedUserIdsArray.includes(isAuthenticated.user.user_id) ? 'activeIcon' : 'defaultIcon');
        }
      }, [petData.pet_status, isAuthenticated.user.user_id]);
    const onRequestClose = () => {
        setIsOpen(false);
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };


    const handleAdoptIconClick = async () => {
        if (!isAuthenticated.user.Fname) {
            setShowModalLogin(true);
            handleOpenModal();
            return;
        }
        try {
            setSaveSuccess(false);
            setSaveError('');
            if (petData.pet_status === 3) {
                const response = await fetchPutPetAdopt(petData.id, "Adopt");
                
                if (response.status === 200) {
                    setShowTimeIcon(false);
                    setAdoptIconClass('activeIcon');
                    setSaveSuccess(true);
                    setSaveError('');
                } else if (response.status !== 200) {
                    setSaveSuccess(false);
                    setSaveError(error);
                }


            } else if (petData.pet_status === 1) {
                const response = await fetchDeletePetReturn(petData.id);
                
                if (response.status === 200) {
                    setShowTimeIcon(true);
                    setAdoptIconClass('defaultIcon');
                    setSaveSuccess(true);
                    setSaveError('');
                } else if (response.status !== 200) {
                    setSaveSuccess(false);
                    setSaveError(response.data.message);
                }
            }

        } catch (error) {
            setSaveSuccess(false);
            setSaveError(error);
        }
    };

    const handleTimeIconClick = async () => {
        if (!isAuthenticated.user.Fname) {
            setShowModalLogin(true);
            handleOpenModal();
            return;
        }
        try {
            setSaveSuccess(false);
            setSaveError('');
            if (petData.pet_status === 3) {
                const response = await fetchPutPetAdopt(petData.id, "Foster");
                
                if (response.status === 200) {
                    setShowAdoptIcon(false);
                    setTimeIconClass('activeIcon');
                    setSaveSuccess(true);
                    setSaveError('');
                } else if (response.status !== 200) {
                    setSaveSuccess(false);
                    setSaveError(error);
                }


            } else if (petData.pet_status === 2) {
                const response = await fetchDeletePetReturn(petData.id);
                
                if (response.status === 200) {
                    setShowAdoptIcon(true);
                    setTimeIconClass('defaultIcon');
                    setSaveSuccess(true);
                    setSaveError('');
                } else if (response.status !== 200) {
                    setSaveSuccess(false);
                    setSaveError(response.data.message);
                }
            }

        } catch (error) {
            setSaveSuccess(false);
            setSaveError(error);
        }
    };
    
    const handleFavoriteIconClick = async () => {
        if (!isAuthenticated.user.Fname) {
            setShowModalLogin(true);
            handleOpenModal();
            return;
        }
        try {
            setSaveSuccess(false);
            setSaveError('');
            if (!savedUserIdsArray.includes(isAuthenticated.user.user_id)) {
                const response = await fetchPutPetSave(petData.id, isAuthenticated.user.userId);
                
                if (response.status === 200) {
                    setFavoriteIconClass('activeIcon');
                    setSaveSuccess(true);
                    setSaveError('');
                } else if (response.status !== 200) {
                    setSaveSuccess(false);
                    setSaveError(error);
                }

            } else if (savedUserIdsArray.includes(isAuthenticated.user.user_id)) {
                const response = await fetchDeletePetUnsave(petData.id);
                
                if (response.status === 200) {
                    setFavoriteIconClass('defaultIcon');
                    setSaveSuccess(true);
                    setSaveError('');
                } else if (response.status !== 200) {
                    setSaveSuccess(false);
                    setSaveError(response.data.message);
                }
            }

        } catch (error) {
            setSaveSuccess(false);
            setSaveError(error);
        }
    }

    return (
        <>
            <SaveMassage success={saveSuccess} error={saveError} />
            {showModalLogin && <ModalToChange isOpen={isOpen} onRequestClose={onRequestClose} />}
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
                            {petData.pet_status === 3 && showAdoptIcon && <AdoptIcon className={adoptIconClass} onClick={handleAdoptIconClick} />}
                            {petData.pet_status === 3 && showTimeIcon && <TimeIcon className={timeIconClass} onClick={handleTimeIconClick} />}
                            {petData.pet_status !== 3 && petData.pet_status !== 2 && showAdoptIcon && <AdoptIcon className={adoptIconClass} onClick={handleAdoptIconClick} />}
                            {petData.pet_status !== 3 && petData.pet_status !== 1 && showTimeIcon && <TimeIcon className={timeIconClass} onClick={handleTimeIconClick} />}
                            <FavoriteIcon className={favoriteIconClass} onClick={handleFavoriteIconClick} />
                        </div>
                    </div>
                </div>
            </div>
        </>)
}