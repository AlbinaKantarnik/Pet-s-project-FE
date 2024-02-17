import './MyPets.css'
import { useState } from 'react'
import React from 'react';
import MyPetsResults from '../components/MyPetsResults'
import MySavedPetsResults from '../components/MySavedPetsResults';
import { PetsIcon } from '../Elements/Icon/PetsIcon';
import { SavedIcon } from '../Elements/Icon/SavedIcon';
import { useParams } from 'react-router-dom';

export default function MyPets() {
  const { id_user } = useParams();
  const [savedPets, setSavedPets] = useState(false);

    return (
      <>
      <div className="myPets-container">
        <div className='myPets-content'>
        <h1>Good deal! Saving money, saving lives</h1>
        <h2><i>Jack Russell Milo</i></h2>
        </div>
        <div className="MyPetsResults">
        <button onClick={() => setSavedPets(false)} className={savedPets ?"inactive-button" : "active-button" }><PetsIcon/>My pets</button>
        <button onClick={() => setSavedPets(true)} className={savedPets ? "active-button" : "inactive-button"}><SavedIcon/>Saved pets</button>
        </div>
        {savedPets ?  <MySavedPetsResults id_user={id_user}/>:  <MyPetsResults id_user={id_user}/>}
      </div>
      
      </>
    )
}