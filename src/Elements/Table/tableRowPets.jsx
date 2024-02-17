import React from 'react';
import PetModal from '../../components/PetModal';

import { Link } from 'react-router-dom';

const TableRowPets = ({ data, headers, handleOpen, selectPet, show, handleClose, selectedPet }) => {
  data.sort((a, b) => b.id - a.id);

  const handleEditClick = (rowData) => {
    selectPet(rowData);
    handleOpen();
  };

  // const petProps = {
  //   show: show,
  //   handleOpen: handleOpen,
  //   handleClose: handleClose,
  //   selectedPet: selectedPet,
  //   selectPet: selectPet
  // };
  return (
    <>
      {data.map((rowData) => (
        <tr key={rowData.id}>
          {headers.map((header) => (
            <td key={`${rowData.id}-${header.key}`}>{rowData[header.key]}</td>
          ))}

          <td><button>
            {/* <Link to={`/pets/${rowData.id}`} show={show} handleOpen={handleOpen} handleClose={handleClose} selectedPet={selectedPet} selectPet={selectPet} >Single page</Link> */}

            {/* <Link to={{ pathname: `/pets/${rowData.id}`, state: { show, handleOpen, handleClose, selectedPet, selectPet } }}>Single page</Link> */}

            <Link to={ `/pets/${rowData.id}`}>Single page</Link>
            {/* <Link
              to={{
                pathname: `/pets/${rowData.id}`,
                state: {
                  show,
                  handleOpen,
                  handleClose,
                  selectedPet,
                  selectPet,
                  handleEditClick: handleEditClick // Передаем handleEditClick через state
                }
              }}
            >
              Single page
            </Link> */}
          </button> </td>
          <td><button onClick={() => handleEditClick(rowData)}>Edit</button></td>
          <PetModal show={show} handleClose={handleClose} selectedPet={selectedPet} selectPet={selectPet} />
        </tr>
      ))}
    </>
  );
};

export default TableRowPets;
