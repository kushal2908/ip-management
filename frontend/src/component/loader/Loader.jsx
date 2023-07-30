import { Modal, ModalBody, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";

export default function Loader() {
  const { isOpen } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalBody>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </ModalBody>
    </Modal>
  );
}
