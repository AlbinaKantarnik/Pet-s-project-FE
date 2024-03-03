import { fetchGetTypesPet } from '../API/fetchServer';
import PetCard from '../components/PetCard';
import PetSearchAllComponent from '../components/Search/PetSearchAll'
import PetSearchTypeComponent from '../components/Search/PetSearchType'
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
  const [hasLess, setHasLess] = useState(false);
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

  //доделать поэтапный показ результатов + использовать общее кол-во результатов
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

  const handleLoadLess = () => {
    if (offset - SEARCH_LIMIT >= 0) {
      setOffset(prevOffset => prevOffset - SEARCH_LIMIT);
    }
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

            {isAdvancedSearch ?
              <PetSearchAllComponent
                onPetData={handlePetData}
                scrollToResults={scrollToResults}
                setSearched={setSearched}
                petTypes={petTypes}
                offset={offset}
                setOffset={setOffset}
                setHasMore={setHasMore}
                setHasLess={setHasLess}
                SEARCH_LIMIT={SEARCH_LIMIT}
              /> :

              <PetSearchTypeComponent
                onPetData={handlePetData}
                scrollToResults={scrollToResults}
                petTypes={petTypes} />}
          </div>

          <div className='resultOfSearch'>
            {searched && petData.length === 0 && (
              <div className='Card'><h2>Sorry, we couldn't find any results. Clear your filters and try again.</h2></div>
            )}
            <div ref={resultsRef}></div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && petData.map((pet) => (

              <PetCard key={pet.id} petData={pet} />))}
            <div className='LoadMore'>
              {searched && hasLess && !isLoading && (<button onClick={handleLoadLess} disabled={isLoading}>Back</button>)}
              {searched && hasMore && !isLoading && (<button onClick={handleLoadMore} disabled={isLoading}>Load More</button>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
};