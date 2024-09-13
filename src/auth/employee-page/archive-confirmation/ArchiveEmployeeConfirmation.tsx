// import React from 'react';
import './ArchiveEmployeeConfirm.css';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import { DatePicker, Form, message } from 'antd';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../common/axios';
import { authorization } from '../../../common/services/authorization';
import { Employee } from '../../../common/services/employee/types';
import { capitalizeNameHelper } from '../../../common/services/helper';

type ArchiveEmployeeConfirmationProps = {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
};

type ArchiveEmployeeRequest = {
  endDateStr: string;
};

const ArchiveEmployeeConfirmation = ({
  employee,
  isOpen,
  onClose,
}: ArchiveEmployeeConfirmationProps) => {
  const formInitialValue: ArchiveEmployeeRequest = {
    endDateStr: '',
  };

  const formik = useFormik({
    initialValues: formInitialValue,
    onSubmit: () => {
      // console.log('ini nilai end date: ', formik.values);
      const { endDateStr } = formik.values;

      mutate({ endDateStr: endDateStr });
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (body: ArchiveEmployeeRequest) => {
      const archiveResponse = await axiosInstance.patch(
        `/auth/employees/archive/${employee.id}`,
        body,
        { headers: authorization() }
      );

      return archiveResponse;
    },
    onSuccess: () => {
      success();
      onClose();
    },
    onError: () => {
      error();
    },
  });

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Success set archive employee',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Failed to set archive employee',
    });
  };

  return (
    <>
      {contextHolder}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="archive-employee-modalbody-container">
              <div className="archive-employee-modalbody-info-container">
                <h1 className="archive-employee-modalbody-info-empname">
                  {capitalizeNameHelper(employee.name)}
                </h1>
                <h1>{employee.id}</h1>
              </div>
              <div className="archive-employee-modalbody-datepick-container">
                <p>Are you sure want to archive?</p>
                <p className="archive-employee-modalbody-datepick-confirm-message">
                  Please enter "END DATE"
                </p>
                <Form onFinish={formik.handleSubmit}>
                  <DatePicker
                    name="endDate"
                    getPopupContainer={(trigger) => trigger.parentElement!}
                    onChange={(date, dateString) => {
                      formik.setFieldValue('endDateStr', dateString);
                    }}
                  />
                </Form>
              </div>
            </div>
          </ModalBody>
          <ModalFooter style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              style={{ backgroundColor: '#D7263D', color: '#fff' }}
              mr={3}
              onClick={formik.submitForm}
            >
              Archive
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ArchiveEmployeeConfirmation;
