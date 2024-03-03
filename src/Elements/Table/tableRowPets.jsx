import React from 'react';
import PetModal from '../../components/Modal components/PetModal';

import { Link } from 'react-router-dom';

const TableRowPets = ({ data, headers, handleOpen, selectPet, show, handleClose, selectedPet, fetchUpdatedPetList }) => {
  data.sort((a, b) => b.id - a.id);

  const handleEditClick = (rowData) => {
    selectPet(rowData);
    handleOpen();
  };

  return (
    <>
      {data.map((rowData) => (
        <tr key={rowData.id}>
          {headers.map((header) => (
            <td key={`${rowData.id}-${header.key}`}>{rowData[header.key]}</td>
          ))}

          <td><button>
            <Link to={`/pets/${rowData.id}`}>Single page</Link>
          </button> </td>
          <td><button onClick={() => handleEditClick(rowData)}>Edit</button></td>
          <PetModal show={show} handleClose={handleClose} selectedPet={selectedPet} selectPet={selectPet} fetchUpdatedPetList={fetchUpdatedPetList} />
        </tr>
      ))}
    </>
  );
};

export default TableRowPets;
