import React from 'react';
import Modal from "react-modal";
import Pet from './Pet';

const PetModal = ({ show, handleClose, selectedPet, selectPet}) => {

  return (
    <Modal isOpen={show} onRequestClose={handleClose}>
      <Pet handleClose={handleClose} selectedPet={selectedPet} selectPet={selectPet}/>
    </Modal>
  );
};

export default PetModal;
