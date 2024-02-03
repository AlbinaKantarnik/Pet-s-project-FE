import React, { useState } from 'react';
import { fetchGetPetSearchAll } from '../API/fetchServer';

const PetSearchAllComponent = ({onPetData}) => {
    const [searchPetsAll, setSearchPetsAll] = useState({
        type: '',
        name: '',
        height: '',
        weight: '',
        status: ''
    });

    const handleSearch = async () => {
        try {
            const responseData = await fetchGetPetSearchAll(searchPetsAll);
            onPetData(responseData);
        } catch (error) {
            console.error('Error:', error.message);

        }
    };

    const handleInputChange = (event) => {
        const { name, value, type } = event.target;
        if (type === 'radio') {
            setSearchPetsAll((prevParams) => ({
                ...prevParams,
                status: value
            }));
        } else {
            setSearchPetsAll((prevParams) => ({
                ...prevParams,
                [name]: name === 'height' || name === 'weight' ? Number(value) : value
            }));
        }
    };

    return (
        <>
            <div className='FullSearch'>
                <h4>Type
                    <input
                        type="text"
                        name="type"
                        value={searchPetsAll.type}
                        onChange={handleInputChange}
                        placeholder="Pet Type"
                    /></h4>
                <h4>Name
                    <input
                        type="text"
                        name="name"
                        value={searchPetsAll.name}
                        onChange={handleInputChange}
                        placeholder="Pet Name"
                    /></h4>
                <h4>Height
                    <input
                        type="number"
                        name="height"
                        value={searchPetsAll.height}
                        onChange={handleInputChange}
                        placeholder="Pet's height (sm)"
                    /></h4>
                <h4>Weight
                    <input
                        type="number"
                        name="weight"
                        value={searchPetsAll.weight}
                        onChange={handleInputChange}
                        placeholder="(kg)"
                    /></h4>
                <div className='petStatus'>
                    <h4>Pet's status:</h4>
                    <div className='lableColomns'>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="adopt"
                            checked={searchPetsAll.status.includes('adopt')}
                            onChange={handleInputChange}
                        />
                        Adopted
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="foster"
                            checked={searchPetsAll.status.includes('foster')}
                            onChange={handleInputChange}
                        />
                        Foster
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="unindentified"
                            checked={searchPetsAll.status.includes('unindentified')}
                            onChange={handleInputChange}
                        />
                        Available
                    </label></div></div>
            </div>
            <button onClick={handleSearch}>Search</button>
        </>
    );
};

export default PetSearchAllComponent;

