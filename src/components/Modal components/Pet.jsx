import React, { useState } from 'react';
import { fetchPostNewPet, fetchPutPetEdit } from '../../API/fetchServer';

const Pet = ({ handleClose, selectedPet,fetchUpdatedPetList}) => {

    const [name, setName] = useState(selectedPet ? selectedPet.name : '');
    const [type, setType] = useState(selectedPet ? selectedPet.type : '');
    const [picture, setPicture] = useState(selectedPet ? selectedPet.picture : '');
    const [height, setHeight] = useState(selectedPet ? selectedPet.height : '');
    const [weight, setWeight] = useState(selectedPet ? selectedPet.weight : '');
    const [color, setColor] = useState(selectedPet ? selectedPet.color : '');
    const [bio, setBio] = useState(selectedPet ? selectedPet.bio : '');
    const [hypoallergenic, setHypoallergenic] = useState(selectedPet ? (selectedPet.hypoallergenic === 1): false);
    const [dietaryRestrictions, setDietaryRestrictions] = useState(selectedPet ? selectedPet.dietaryRestrictions || '' : '');
    const [breed, setBreed] = useState(selectedPet ? selectedPet.breed : '');

    const handlePetChange = (e) => {
        e.preventDefault();

        setName('');
        setType('');
        setPicture('');
        setHeight('');
        setWeight('');
        setColor('');
        setBreed('');
        setBio('');
        setDietaryRestrictions('');
        setHypoallergenic(false);
    };

    const handleAddPetServer = async () => {
        const newPet = {
            name: name.charAt(0).toUpperCase() + name.slice(1),
            type: type.toLowerCase(),
            picture: picture,
            height: parseInt(height),
            weight: parseInt(weight),
            color: color.toLowerCase(),
            bio: bio,
            hypoallergenic: hypoallergenic,
            dietary_restrictions: dietaryRestrictions,
            breed: breed.toLowerCase()
        };

        try {
            const responseData = await fetchPostNewPet(newPet);
            fetchUpdatedPetList();
            handleClose();
            return responseData;
        } catch (error) {
            console.error('Error add pet:', error.message);
        }
    };

    const handleEditPetServer = async () => {
        const id_pet = selectedPet.id;
        const editPet = {
            name: name.charAt(0).toUpperCase() + name.slice(1),
            type: type.toLowerCase(),
            picture: picture,
            height: parseInt(height),
            weight: parseInt(weight),
            color: color.toLowerCase(),
            bio: bio,
            hypoallergenic: hypoallergenic,
            dietary_restrictions: dietaryRestrictions,
            breed: breed.toLowerCase()
        };
        try {
            const responseData = await fetchPutPetEdit(id_pet, editPet);
            fetchUpdatedPetList();
            handleClose();
            return responseData;
        } catch (error) {
            console.error('Error edit pet:', error);
        }
    }

    return (
        <div className='FormContainer'>
            <form onSubmit={handlePetChange} className='Form'>
                <label className='FormLabel'>Pet Name *:
                    <input type='text' placeholder='Pet Name' value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label className='FormLabel'>Pet Type *:
                    <input type='text' placeholder='Pet Type' value={type} onChange={(e) => setType(e.target.value)} />
                </label>
                <label className='FormLabel'>Breed *:
                    <input type='text' placeholder='Breed' value={breed} onChange={(e) => setBreed(e.target.value)} />
                </label>
                <label className='FormLabel'>Color *:
                    <input type='text' placeholder='Color' value={color} onChange={(e) => setColor(e.target.value)} />
                </label>
                <label className='FormLabel'>Picture URL *:
                    <input type='text' placeholder='Picture URL' value={picture} onChange={(e) => setPicture(e.target.value)} />
                </label>
                <label className='FormLabel'>Height (sm) *:
                    <input type='text' placeholder='Height sm' value={height} onChange={(e) => setHeight(e.target.value)} />
                </label>
                <label className='FormLabel'>Weight (kg) *:
                    <input type='text' placeholder='Weight kg ' value={weight} onChange={(e) => setWeight(e.target.value)} />
                </label>

                <label className='FormLabel'>Bio:
                    <textarea placeholder='Bio' value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                </label>

                <label className='FormLabel'>Dietary Restrictions:
                    <input type='text' placeholder='Dietary Restrictions' value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} />
                </label>

                <label className='FormLabel'>Hypoallergenic:
                    <input type='checkbox' checked={hypoallergenic} onChange={(e) => setHypoallergenic(e.target.checked)} />
                </label>

            </form>
            <h5><i>* - required fields</i></h5>
            {selectedPet.id ?
                <button onClick={handleEditPetServer} type='button'>{'Edit pet'}</button> :
                <button onClick={handleAddPetServer} type='button'>{'Add new pet'}</button>
            }
        </div>
    );
};

export default Pet;
