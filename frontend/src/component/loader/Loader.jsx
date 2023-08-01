import { Heading, Modal, ModalBody, ModalContent, ModalOverlay, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Modal isOpen={true} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody m="auto" py="8">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          <Heading size="sm" fontWeight="500" mt="2">
            Loading...
          </Heading>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
