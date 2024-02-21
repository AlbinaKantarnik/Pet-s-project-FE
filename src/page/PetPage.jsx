import { AdoptIcon } from '../Elements/Icon/AdoptIcon'
import { FavoriteIcon } from '../Elements/Icon/FavoriteIcon'
import { TimeIcon } from '../Elements/Icon/TimeIcon'
import './PetPage.css'
import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchGetPetById } from '../API/fetchServer';
import Loading from '../components/Loading';

const PetPage = () => {
  const { id_pet } = useParams();
  const [petData, setPetData] = useState(null);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await fetchGetPetById(id_pet);
        setPetData(response[0]);
      } catch (error) {
        console.error('Error fetching to pet page:', error);
      }
    };

    fetchPetData();
  }, [id_pet]);

  if (!petData) {
    return <Loading />
  }

  //   if (!petData || petData.id !== id_pet) {
  //   return <div className='Loading'>Pet data not found...</div>;
  // }

  const getPetStatusText = (status) => {
    switch (status) {
      case 1:
        return "happy! I HAVE my favorite OWNER!";
      case 2:
        return "joyful! I have being FOOSTERED now!";
      case 3:
        return "probably WAITING FOR YOU! Take me to your place!";
      default:
        return "Unknown status";
    }
  };

  const adoptButtonClass = petData.pet_status === 1 ? 'primary' : '';
  const timeButtonClass = petData.pet_status === 2 ? 'primary' : '';
  const saveButtonClass = petData.saved_pet === 1 ? 'primary' : '';

  return (
    <>
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
            <button className={adoptButtonClass}><AdoptIcon /> Adopt</button>
            <button className={timeButtonClass}><TimeIcon /> Fooster</button>
            <button className={saveButtonClass}><FavoriteIcon /> Save</button>
          </div>
        </div>



      </div>
    </>
  );
}
export default PetPage;