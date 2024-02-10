import React from 'react';
import PetModal from '../../components/PetModal';

const TableRowPets = ({ data, headers, handleOpen, selectPet, show, handleClose, selectedPet }) => {
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
        <td><button>Single page</button></td>
        <td><button onClick={() => handleEditClick(rowData)}>Edit</button></td>
        <PetModal show={show} handleClose={handleClose} selectedPet={selectedPet} selectPet={selectPet}/>
        </tr>
      ))}
    </>
  );
};

export default TableRowPets;
