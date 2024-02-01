import PetSearchAllComponent from '../components/PetSearchAll'
import PetSearchTypeComponent from '../components/PetSearchType'
import './Search.css'
import { useState } from 'react'

export default function Search() {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  return (
    <>
      <div className="search-container">
        <div className='search-content'>
          <h1>Search pet</h1>
          <div className='search-button'>
            <button onClick={() => setIsAdvancedSearch(false)} className={isAdvancedSearch ? "inactive-button" : "active-button"}>Basic search</button>
            <button onClick={() => setIsAdvancedSearch(true)} className={isAdvancedSearch ? "active-button" : "inactive-button"}>Advanced search</button>
          </div>
          {isAdvancedSearch ? <PetSearchAllComponent /> : <PetSearchTypeComponent/>}
        </div>
      </div>
    </>
  )
};