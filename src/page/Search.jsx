import PetCard from '../components/PetCard';
import PetSearchAllComponent from '../components/PetSearchAll'
import PetSearchTypeComponent from '../components/PetSearchType'
import './Search.css'
import { useState } from 'react'


export default function Search() {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [petData, setPetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchTypeChange = (isAdvancedSearch) => {
    setIsAdvancedSearch(isAdvancedSearch);
    setPetData([]); 
  };

  const handlePetData = (responseData) => {
    setPetData(responseData);
};

  return (
    <>
      <div className='search-main'>
        <div className="search-container">
          <div className='search-content'>
            <h1>Search pet</h1>
            <div className='search-button'>
              <button onClick={() => handleSearchTypeChange(false)} className={isAdvancedSearch ? "inactive-button" : "active-button"}>Basic search</button>
              <button onClick={() => handleSearchTypeChange(true)} className={isAdvancedSearch ? "active-button" : "inactive-button"}>Advanced search</button>
            </div>
            {isAdvancedSearch ? <PetSearchAllComponent onPetData={handlePetData}/> : <PetSearchTypeComponent onPetData={handlePetData}/>}
          </div>
          <div className='resultOfSearch'>
            {isLoading && <p>Loading...</p>} 
            {!isLoading && petData.map((pet) => (
            <PetCard key={pet.id} petData={pet} />))}
          </div>
        </div>
      </div>
    </>
  )
};