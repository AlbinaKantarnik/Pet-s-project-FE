import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';


export default function MySavedPetsResults({id_user}) {
    
    const [mySavePetData, setMySavePetData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect()
    if (!myPetData) {
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