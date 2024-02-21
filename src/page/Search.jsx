import { fetchGetTypesPet } from '../API/fetchServer';
import PetCard from '../components/PetCard';
import PetSearchAllComponent from '../components/PetSearchAll'
import PetSearchTypeComponent from '../components/PetSearchType'
import './Search.css'
import React, { useEffect } from 'react';
import { useState, useRef } from 'react'


export default function Search() {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [petData, setPetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [petTypes, setPetTypes] = useState([]);
  const [searched, setSearched] = useState(false);
  const resultsRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  // const [hasLess, setHasLess] = useState(false);
  const [offset, setOffset] = useState(0);

  const SEARCH_LIMIT = 5;

  useEffect(() => {
    const fetchPetTypes = async () => {
      try {
        const types = await fetchGetTypesPet();
        setPetTypes(types);
      } catch (error) {
        console.error('Error fetching pet types:', error.message);
      }
    };

    fetchPetTypes();
  }, []);

  useEffect(() => {
    if (searched && petData.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searched, petData]);

  const handleSearchTypeChange = (isAdvancedSearch) => {
    setIsAdvancedSearch(isAdvancedSearch);
    setPetData([]);
  };

  const handlePetData = (responseData) => {
    setPetData(responseData);
  };

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + SEARCH_LIMIT);
  };

// const handleLoadLess = () => {
//   setOffset(prevOffset => prevOffset - SEARCH_LIMIT);
// };

console.log('offset parent', offset)

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

            {isAdvancedSearch ? 
              <PetSearchAllComponent 
                onPetData={handlePetData} 
                scrollToResults={scrollToResults} 
                setSearched={setSearched} 
                petTypes={petTypes} 
                offset={offset} 
                setOffset={setOffset} 
                setHasMore={setHasMore}
                // setHasLess={setHasLess}
                /> :

              <PetSearchTypeComponent 
              onPetData={handlePetData} 
              scrollToResults={scrollToResults}  
              petTypes={petTypes} />}
          </div>

          <div className='resultOfSearch'>
            {searched && petData.length === 0 && (
              <h2>Sorry, we couldn't find any results. Clear your filters and try again.</h2>
            )}
            <div ref={resultsRef}></div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && petData.map((pet) => (
              <PetCard key={pet.id} petData={pet} />))}
              {searched && hasMore && !isLoading && (<div className='LoadMore'><button onClick={handleLoadMore} disabled={isLoading}>Load More</button></div>)}
              {/* {searched && hasLess && !isLoading && (<div className='LoadMore'><button onClick={handleLoadLess} disabled={isLoading}>Back</button></div>)} */}
          </div>

        </div>
      </div>
    </>
  )
};