import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
// import React from 'react';
import { ShiftRoster } from '../../common/services/shift-roster/types';
import RosterModalTable from './roster-modal-table/RosterModalTable';
import { formatDateNormalHelper } from '../../common/services/helper';

type RosterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  rosterData: ShiftRoster;
  isLoading: boolean;
};

const RosterModal = ({
  isOpen,
  onClose,
  rosterData,
  isLoading,
}: RosterModalProps) => {
  console.log('selectedRosterData: ', rosterData);
  console.log('isloadingcoy: ', isLoading);

  const shiftDate = new Date(rosterData.date);

  const shiftDateStr = formatDateNormalHelper(shiftDate.toString(), 'long');

  const hatariEmp = rosterData.crew.employees?.filter(
    (emp) => emp.pit?.id === 2
  );
  const bintangEmp = rosterData.crew.employees?.filter(
    (emp) => emp.pit?.id === 1
  );
  const jupiterEmp = rosterData.crew.employees?.filter(
    (emp) => emp.pit?.id === 3
  );
  const floatingEmp = rosterData.crew.employees?.filter(
    (emp) => emp.pit?.id === 4
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h1>CREW {rosterData.crew.name.toUpperCase()}</h1>
            <h1>{shiftDateStr}</h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RosterModalTable
              // label={'Bintang'}
              date={rosterData.date}
              // employees={bintangEmp || []}
              bintangData={bintangEmp || []}
              hatariData={hatariEmp || []}
              jupiterData={jupiterEmp || []}
              floatingData={floatingEmp || []}
            />
            {/* <RosterModalTable
              label={'Hatari'}
              date={rosterData.date}
              employees={hatariEmp || []}
            />
            <RosterModalTable
              label={'Jupiter'}
              date={rosterData.date}
              employees={jupiterEmp || []}
            />
            <RosterModalTable
              label={'Floating'}
              date={rosterData.date}
              employees={floatingEmp || []}
            /> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RosterModal;
