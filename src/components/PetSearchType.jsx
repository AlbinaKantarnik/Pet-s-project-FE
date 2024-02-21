import React, { useEffect, useState } from 'react';
import { fetchGetPetSearch } from '../API/fetchServer';

const PetSearchTypeComponent = ({ onPetData, petTypes, scrollToResults }) => {
  const [searchTypePet, setSearchTypePet] = useState('');



  const handleSearch = async () => {
    try {
      const responseData = await fetchGetPetSearch(searchTypePet);
      onPetData(responseData);
      scrollToResults();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setSearchTypePet(prevParams => ({
  //     ...prevParams,
  //     [name]: value
  //   }));
  // };
  const handleInputChange = (event) => {
    setSearchTypePet(event.target.value);
  };

  return (
    <>
      <div className='FullSearch'>
        <h4>Type
          <select
            name="type"
            value={searchTypePet}
            onChange={handleInputChange}
          >
            <option value="">Select a type</option>
            {petTypes.map(type => (
              <option key={type.type_id} value={type.type}>{type.type}</option>
            ))}
          </select>
        </h4>
      </div>
      <button onClick={handleSearch}>Search</button>

    </>
  );
};

export default PetSearchTypeComponent;