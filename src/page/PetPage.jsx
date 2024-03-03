import { AdoptIcon } from '../Elements/Icon/AdoptIcon'
import { FavoriteIcon } from '../Elements/Icon/FavoriteIcon'
import { TimeIcon } from '../Elements/Icon/TimeIcon'
import './PetPage.css'
import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchDeletePetReturn, fetchDeletePetUnsave, fetchGetPetById, fetchPutPetAdopt, fetchPutPetSave } from '../API/fetchServer';
import Loading from '../components/Loading';
import { useUser } from '../Context/UserContext';
import SaveMassage from '../Elements/Usefull/SaveMassage';
import ModalToChange from '../components/Modal components/ModalToChange';

const PetPage = () => {
  const { id_pet } = useParams();
  const [petData, setPetData] = useState(null);
  const isAuthenticated = useUser();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [showAdoptIcon, setShowAdoptIcon] = useState(true);
  const [showTimeIcon, setShowTimeIcon] = useState(true);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [adoptButtonClass, setAdoptButtonClass] = useState('');
  const [timeButtonClass, setTimeButtonClass] = useState('');
  const [saveButtonClass, setSaveButtonClass] = useState('');

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await fetchGetPetById(id_pet);
        const pet = response[0];
        setPetData(pet);

        setAdoptButtonClass(pet.pet_status === 1 ? 'primary' : '');
        setTimeButtonClass(pet.pet_status === 2 ? 'primary' : '');

        const savedUserIdsArray = pet.saved_user_ids ? pet.saved_user_ids.split(',').map(userId => parseInt(userId)) : [];
        setSaveButtonClass(savedUserIdsArray.includes(isAuthenticated.user.user_id) ? 'primary' : '');
        
      } catch (error) {
        console.error('Error fetching to pet page:', error);
      }
    };
    fetchPetData();
  }, [id_pet, isAuthenticated.user.user_id]);

  if (!petData) {
    return <Loading />;
  }

  const savedUserIdsArray = petData.saved_user_ids ? petData.saved_user_ids.split(',').map(userId => parseInt(userId)) : [];

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const getPetStatusText = (status) => {
    switch (status) {
      case 1:
        return "happy! I HAVE my favorite OWNER!";
      case 2:
        return "joyful! I have being FOSTERED now!";
      case 3:
        return "probably WAITING FOR YOU! Take me to your place!";
      default:
        return "Unknown status";
    }
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
          setPetData(response.data.data)
          setShowTimeIcon(false);
          setAdoptButtonClass('primary');
          setSaveSuccess(true);
          setSaveError('');
        } else if (response.status !== 200) {
          setSaveSuccess(false);
          setSaveError(error);
        }


      } else if (petData.pet_status === 1) {
        const response = await fetchDeletePetReturn(petData.id);
        
        if (response.status === 200) {
          setPetData(response.data.data)
          setShowTimeIcon(true);
          setAdoptButtonClass('');
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
          setPetData(response.data.data)
          setShowAdoptIcon(false);
          setTimeButtonClass('primary');
          setSaveSuccess(true);
          setSaveError('');
        } else if (response.status !== 200) {
          setSaveSuccess(false);
          setSaveError(error);
        }


      } else if (petData.pet_status === 2) {
        const response = await fetchDeletePetReturn(petData.id);
        
        if (response.status === 200) {
          setPetData(response.data.data)
          setShowAdoptIcon(true);
          setTimeButtonClass('');
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
        const response = await fetchPutPetSave(petData.id);
        
        if (response.status === 200) {
          setPetData(response.data.data)
          setSaveButtonClass('primary');
          setSaveSuccess(true);
          setSaveError('');
        } else if (response.status !== 200) {
          setSaveSuccess(false);
          setSaveError(error);
        }

      } else if (savedUserIdsArray.includes(isAuthenticated.user.user_id)) {
        const response = await fetchDeletePetUnsave(petData.id);
        
        if (response.status === 200) {
          setPetData(response.data.data)
          setSaveButtonClass('');
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
      <div className="petPage-container">
        <div className='petPage-content'>

          <div className='Card-header'>
            <button>
              <Link to={`/search`}>Create new search</Link>
            </button>
          </div>

          <div className='CardBlock1'>
            <div className='CardImgPage' style={{ backgroundImage: `url(${petData.picture})` }} />
            <div>
              <h2>My name is {petData.name}</h2>
              <h3>I'm a {petData.color} {petData.type} ({petData.breed})</h3>
              <ul className='stats'>
                <li>
                  <var>{petData.height} sm</var>
                  <label>Height</label>
                </li>
                <li>
                  <var>{petData.weight} kg</var>
                  <label>Weight</label>
                </li>
                <li>
                  <var>{petData.hypoallergenic === 1 ? 'YES' : 'NO'}</var>
                  <label>Hypoallergenic</label>
                </li>
              </ul>

              <h2>I'm  {getPetStatusText(petData.pet_status)}</h2>
              <h3>{petData.bio}  {petData.dietary_restrictions}</h3>
            </div>
          </div>

          <div className='IconCard'>
            {petData.pet_status === 3 && showAdoptIcon && <button className={adoptButtonClass} onClick={handleAdoptIconClick}><AdoptIcon /> Adopt</button>}
            {petData.pet_status === 3 && showTimeIcon && <button className={timeButtonClass} onClick={handleTimeIconClick}><TimeIcon />
              Foster</button>}

            {petData.pet_status !== 3 && petData.pet_status !== 2 && showAdoptIcon && <button className={adoptButtonClass} onClick={handleAdoptIconClick}><AdoptIcon /> Adopt</button>}
            {petData.pet_status !== 3 && petData.pet_status !== 1 && showTimeIcon && <button className={timeButtonClass} onClick={handleTimeIconClick}><TimeIcon />
              Foster</button>}
            <button className={saveButtonClass} onClick={handleFavoriteIconClick}><FavoriteIcon /> Save</button>

          </div>
        </div>



      </div>
    </>
  );
}
export default PetPage;