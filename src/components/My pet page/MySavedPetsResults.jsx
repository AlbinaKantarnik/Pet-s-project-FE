import React, { useEffect, useState } from 'react';
import PetCard from '../PetCard';
import { fetchGetMySavedPets } from '../../API/fetchServer';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

export default function MySavedPetsResults({ id_user }) {

    const [mySavePetData, setMySavePetData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchMySavedPetData = async () => {
            try {
                const response = await fetchGetMySavedPets(id_user);
                setMySavePetData(response.data);
            } catch (error) {
                console.error('Error fetching to user page:', error);
            }
        };

        fetchMySavedPetData();
    }, [id_user]);

    if (!mySavePetData) {
        return <Loading/>
      }

    if (mySavePetData.length === 0) {
        return <div className='noPetsResult'><h2>You currently don't have any pets.</h2>
            <button>
                <Link to={`/search`}>Find your new best friend</Link>
            </button>
        </div>
    }
    return (
        <>
            <div className="SavedPetsTable">
                <div className='resultOfSearch'>
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && mySavePetData.map((pet) => (
                        <PetCard key={pet.id} petData={pet} />))}
                </div>
            </div>

        </>
    )
}