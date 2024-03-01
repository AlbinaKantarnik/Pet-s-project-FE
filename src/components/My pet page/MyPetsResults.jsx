import React, { useEffect, useState } from 'react';
import { fetchGetMyPets } from '../../API/fetchServer';
import PetCard from '../PetCard';
import { Link } from 'react-router-dom';

export default function MyPetsResults({ id_user }) {
    const [myPetData, setMyPetData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMyPetData = async () => {
            try {
                const response = await fetchGetMyPets(id_user);
                setMyPetData(response);
            } catch (error) {
                console.error('Error fetching to user page:', error);
            }
        };

        fetchMyPetData();
    }, [id_user]);

    if (myPetData.length === 0) {
        return <div className='noPetsResult'><h2>You currently don't have any pets.</h2>
               <button>
                    <Link to={`/search`}>Find your new best friend</Link>
                </button>
                </div>
    }

    return (
        <>

            <div className="PetsTable">
                <div className='resultOfSearch'>
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && myPetData.map((pet) => (
                        <PetCard key={pet.id} petData={pet} />))}
                </div>
            </div>

        </>
    )
}