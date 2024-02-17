import React, { useEffect, useState } from 'react';
import { fetchGetMyPets } from '../API/fetchServer';
import PetCard from './PetCard';

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

    console.log("myPetData", myPetData)

    if (!myPetData) {
        return <h2>You currently don't have any pets.</h2>
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