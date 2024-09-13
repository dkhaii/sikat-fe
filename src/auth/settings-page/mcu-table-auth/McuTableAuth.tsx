import React from 'react';
import './McuTableAuth.css';
import { McuReminder } from '../../../common/services/mcu-reminder/types';
import {
  capitalizeNameHelper,
  formatDateNormalHelper,
} from '../../../common/services/helper';
import { Button, message } from 'antd';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button as ButtonChakra,
} from '@chakra-ui/react';
import { useDeleteMcuReminder } from '../../../common/services/mcu-reminder/useDeleteMcuReminder';

type McuReminderTableProps = {
  label: string;
  mcuReminder?: McuReminder[];
};

const McuTableAuth = ({ label, mcuReminder }: McuReminderTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log('finger data: ', mcuReminder);
  const [selectedMcu, setSelectedMcu] = React.useState<McuReminder | null>(
    null
  );
  const { mutate } = useDeleteMcuReminder(
    () => {
      message.success('Delete MCU successfully');
      onClose();
    },
    (error) => {
      message.error(`Error: ${error}`);
    }
  );

  const handleDelete = (mcu: McuReminder) => {
    setSelectedMcu(mcu);
    onOpen();
  };

  const confirmDelete = () => {
    if (selectedMcu) {
      mutate(selectedMcu.id);
      onClose();
    }
  };

  return (
    <>
      <div className="mcu-table-container">
        <div className="mcutable-label-container">
          <h1>{label}</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Badge</th>
              <th>Name</th>
              <th>Position</th>
              <th>Crew</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mcuReminder?.map((mcu) => (
              <tr key={mcu.empID}>
                <th>{mcu.empID}</th>
                <th className="mcutable-name-text">
                  {capitalizeNameHelper(mcu.employee?.name || '')}
                </th>
                <th>{mcu.employee?.position?.name.toUpperCase()}</th>
                <th>{mcu.employee?.crew?.name.toUpperCase()}</th>
                <th>{formatDateNormalHelper(mcu.date.toString(), 'long')}</th>
                <th>
                  <Button onClick={() => handleDelete(mcu)}>Delete</Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>
                Delete MCU - {selectedMcu?.empID} /{' '}
                {selectedMcu?.employee?.name}
              </p>
            </ModalBody>

            <ModalFooter>
              <ButtonChakra colorScheme="red" onClick={confirmDelete}>
                Delete
              </ButtonChakra>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
};

export default McuTableAuth;
