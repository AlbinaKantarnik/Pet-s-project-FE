import './MyPets.css'
import { useState } from 'react'

import MyPetsResults from '../components/MyPetsResults'
import MySavedPetsResults from '../components/MySavedPetsResults';

export default function MyPets() {
  const [savedPets, setSavedPets] = useState(false);

    return (
      <>
      <div className="myPets-container">
        <div className='myPets-content'>
        <h1>Good deal! Saving money, saving lives</h1>
        <h2><i>Jack Russell Milo</i></h2>
        </div>
        <div className="MyPetsResults">
        <button onClick={() => setSavedPets(false)} className={savedPets ?"inactive-button" : "active-button" }>My pets</button>
        <button onClick={() => setSavedPets(true)} className={savedPets ? "active-button" : "inactive-button"}>Saved pets</button>
        </div>
        {savedPets ?  <MySavedPetsResults/>:  <MyPetsResults/>}
      </div>
      
      </>
    )
}