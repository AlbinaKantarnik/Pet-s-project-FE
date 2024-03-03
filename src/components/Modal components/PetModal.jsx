import React from 'react';
import Modal from "react-modal";
import Pet from './Pet';

const PetModal = ({ show, handleClose, selectedPet, selectPet, fetchUpdatedPetList}) => {

  return (
    <Modal isOpen={show} onRequestClose={handleClose}>
      <Pet handleClose={handleClose} selectedPet={selectedPet} selectPet={selectPet} fetchUpdatedPetList={fetchUpdatedPetList}/>
    </Modal>
  );
};

export default PetModal;
