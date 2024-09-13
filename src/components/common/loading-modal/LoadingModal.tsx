import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';

type LoadingModal = {
  isLoading: boolean;
  onClose: () => void;
};

const LoadingModal = ({ isLoading, onClose }: LoadingModal) => {
  return (
    <Modal isOpen={isLoading} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent alignItems={'center'} width={'10rem'}>
        <ModalHeader>Loading...</ModalHeader>
        <ModalBody>
          <Spinner size="xl" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;
