import React, { useState } from 'react';
import { fetchGetPetSearch } from '../API/fetchServer';

const PetSearchTypeComponent = () => {
  const [searchTypePet, setSearchTypePet] = useState({
    type: ''
  });

  const handleSearch = async () => {
    try {
      const responseData = await fetchGetPetSearch(searchTypePet);
      console.log('Server response:', responseData);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchTypePet(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  return (
    <>
      <div className='FullSearch'>
        <h4>Type
          <input
            type="text"
            name="type"
            value={searchTypePet.type}
            onChange={handleInputChange}
            placeholder="Pet Type"
          />
        </h4>
      </div>
      <button onClick={handleSearch}>Search</button>
    </>
  );
};

export default PetSearchTypeComponent;