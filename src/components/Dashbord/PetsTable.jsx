import React, { useState, useEffect} from 'react';
import TableHeader from "../../Elements/Table/tableHeader";
import TableRowPets from "../../Elements/Table/tableRowPets";
import PetModal from '../Modal components/PetModal';
import { fetchGetPetsAll } from '../../API/fetchServer';

const headers = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: "Pet's name" },
    { key: 'type', label: 'Type' },
    { key: 'breed', label: 'Breed' },
    { key: 'status', label: 'Status' },
    { key: 'owner_name', label: 'Owner' },
];

const PetsTable = ({ rowData, setRowData }) => {
    const [show, setShow] = useState(false);
    const [selectedPet, setSelectedPet] = useState({});

    const handleClose = () => {
        setShow(false);
        setSelectedPet({});
    };

    const handleOpen = () => {
        setShow(true);
    };

    const selectPet = (selectedPet) => {
        setSelectedPet(selectedPet);
      };

    useEffect(() => {
        fetchUpdatedPetList();
    }, [rowData]);

    const fetchUpdatedPetList = async () => {
        try {
            const updatedPetList = await fetchGetPetsAll();
            setRowData([updatedPetList]);
        
        } catch (error) {
            console.error('Error fetching updated pet list:', error);
        }
    };
    return (
        <>
            <div className='addPetDiv'>
                <h3> Do you want to add a new pet? Hurry up and do it! </h3>
                <button onClick={handleOpen}>Add pet</button>
                <PetModal show={show} handleClose={handleClose} selectedPet={selectedPet} selectPet={selectPet} />
            </div> 
        
            <table>
                <thead>
                    <tr>
                        <TableHeader headers={headers} />
                        <th>Full pet's info</th>
                        <th>Edit pet</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowPets headers={headers} data={rowData} selectPet={selectPet} handleOpen={handleOpen} show={show} handleClose={handleClose} selectedPet={selectedPet}/>
                </tbody>
            </table>

        </>
    );
};

export default PetsTable;