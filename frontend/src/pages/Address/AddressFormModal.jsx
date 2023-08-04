import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import PropTypes from "prop-types";
import AddressForm from "./AddressForm";

export default function AddressFormModal({ isOpen, onClose, type, selectedId }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{type} IP Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddressForm type={type} onClose={onClose} selectedId={selectedId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

AddressFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  selectedId: PropTypes.string,
};
