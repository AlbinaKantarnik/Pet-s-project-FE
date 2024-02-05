import React from 'react';
import TableHeader from "./tableHeader";
import TableRowPets from "./tableRowPets";

const headers = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: "Pet's name" },
    { key: 'type', label: 'Type' },
    { key: 'breed', label: 'Breed' },
    { key: 'status', label: 'Status' },
    { key: 'owner_name', label: 'Owner' },
];

const PetsTable = ({ rowData }) => {
    return (
        <>
        <div className='addPetDiv'>
            <h3> Do you want to add a new pet? Hurry up and do it! </h3>
            <button>Add pet</button>
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
                    <TableRowPets headers={headers} data={rowData}  />
                </tbody>
            </table>

        </>
    );
};

export default PetsTable;