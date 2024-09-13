import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
// import React from 'react';
import './EmployeeDetailModal.css';
import { Employee } from '../../../common/services/employee/types';
import {
  formatDateHelper,
  formatDateNormalHelper,
} from '../../../common/services/helper';

type EmployeeDetailModalProps = {
  employee: Employee;
  onClose: () => void;
  isOpen: boolean;
};

const EmployeeDetailModal = ({
  employee,
  onClose,
  isOpen,
}: EmployeeDetailModalProps) => {
  // console.log(employee);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="modal-body-container">
              <div className="modal-profilepicture-container">
                <img src={employee.profilePicture} alt="" />
              </div>
              <div className="modal-nameheading-container">
                <div className="modal-empname-container">
                  <h1>{employee.name}</h1>
                </div>
                <div className="modal-empid-container">
                  <h1>{employee.id}</h1>
                </div>
              </div>
              <div className="modal-empdetail-container">
                <div className="modal-empdetailtitle-container">
                  <h1>DOB</h1>
                  <h1>Position</h1>
                  <h1>Base</h1>
                  <h1>Pit</h1>
                  <h1>Crew</h1>
                  <h1>DOH</h1>
                </div>
                <div className="modal-empdetailresult-container">
                  <h1>
                    {formatDateNormalHelper(
                      employee.dateOfBirth.toString(),
                      'long'
                    )}
                  </h1>
                  <h1>{employee.position.name}</h1>
                  <h1>{employee.base?.name}</h1>
                  <h1>{employee.pit?.name}</h1>
                  <h1>{employee.crew?.name}</h1>
                  <h1>
                    {formatDateHelper(employee.dateOfHire.toString(), 'medium')}
                  </h1>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmployeeDetailModal;
