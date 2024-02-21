import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import { fetchGetMySavedPets } from '../API/fetchServer';


export default function MySavedPetsResults({id_user}) {
    
    const [mySavePetData, setMySavePetData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMySavedPetData = async () => {
            try {
                const response = await fetchGetMySavedPets(id_user);
                setMySavePetData(response);
            } catch (error) {
                console.error('Error fetching to user page:', error);
            }
        };

        fetchMySavedPetData();
    }, [id_user]);

    if (mySavePetData.length === 0) {
        return <h2>You currently don't have any pets.</h2>
    }
    return (
        <>
            {/* You currently don't have any pets. */}
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