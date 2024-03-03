import React, { useEffect, useState } from 'react';
import { fetchGetPetSearchAll } from '../../API/fetchServer';
// , setHasLess
const PetSearchAllComponent = ({ onPetData, petTypes, setSearched, offset, setOffset, scrollToResults, setHasMore, setHasLess, SEARCH_LIMIT }) => {
    const [searchPetsAll, setSearchPetsAll] = useState({
        type: '',
        name: '',
        height: '',
        weight: '',
        status: ''
    });

    const handleSearch = async () => {
        try {
            const responseData = await fetchGetPetSearchAll(searchPetsAll, offset);
            onPetData(responseData.data);
            setSearched(true);
            scrollToResults();
            // Рассчитываем общее количество страниц
            const totalPages = Math.ceil(responseData.total_results / SEARCH_LIMIT);

            // Определяем, нужно ли отображать кнопку "Загрузить больше"
            if (offset + SEARCH_LIMIT < responseData.total_results) {
                setHasMore(true);
            } else {
                setHasMore(false);
            }

            // Определяем, нужно ли отображать кнопку "Загрузить меньше"
            if (offset > 0) {
                setHasLess(true);
            } else {
                setHasLess(false);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [offset]);

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

    const handleClear = () => {
        setSearchPetsAll({
            type: '',
            name: '',
            height: '',
            weight: '',
            status: ''
        });
        setHasMore(true);
        setHasLess(false);
        setSearched(false);
        setOffset(0);
        onPetData([]);
    };



    return (
        <>
            <div className='FullSearch'>
                <h4>Type
                    <select
                        name="type"
                        value={searchPetsAll.type}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a type</option>
                        {petTypes.map(type => (
                            <option key={type.type_id} value={type.type}>{type.type}</option>
                        ))}
                    </select></h4>
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
                        step="1"
                    /></h4>
                <h4>Weight
                    <input
                        type="number"
                        name="weight"
                        value={searchPetsAll.weight}
                        onChange={handleInputChange}
                        placeholder="(kg)"
                        step="0.2"
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
                                value="avaliable"
                                checked={searchPetsAll.status.includes('avaliable')}
                                onChange={handleInputChange}
                            />
                            Available
                        </label></div></div>
            </div>
            <div className='search-button'>
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleClear}>Clear filters</button>
            </div>

        </>
    );
};

export default PetSearchAllComponent;

