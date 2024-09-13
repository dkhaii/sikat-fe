import React from 'react';
import './CalendarHolidayTable.css';
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
import { CalendarHoliday } from '../../../common/services/calendar-holiday/types';
import { useDeleteCalendarHoliday } from '../../../common/services/calendar-holiday/useDeleteCalendarHoliday';

type CalendarHolidayTableProps = {
  label: string;
  calendarHoliday?: CalendarHoliday[];
};

const CalendarHolidayTable = ({
  label,
  calendarHoliday,
}: CalendarHolidayTableProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log('finger data: ', calendarHoliday);
  const [selectedCalendarHoliday, setSelectedCalendarHoliday] =
    React.useState<CalendarHoliday | null>(null);
  const { mutate } = useDeleteCalendarHoliday(
    () => {
      message.success('Deleted calendar holiday successfully');
      onClose();
    },
    (error) => {
      message.error(`Error: ${error}`);
    }
  );

  const handleDelete = (holiday: CalendarHoliday) => {
    setSelectedCalendarHoliday(holiday);
    onOpen();
  };

  const confirmDelete = () => {
    if (selectedCalendarHoliday) {
      mutate(selectedCalendarHoliday.id || 0);
      onClose();
    }
  };

  const dataWithManualId = calendarHoliday?.map((holiday, index) => ({
    ...holiday,
    manualId: index + 1,
  }));

  return (
    <>
      <div className="calendarholidaytable-table-container">
        <div className="calendarholidaytable-label-container">
          <h1>{label}</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataWithManualId?.map((holiday) => (
              <tr key={holiday.id}>
                <th>{holiday.manualId}</th>
                <th className="calendarholidaytable-name-text">
                  {capitalizeNameHelper(holiday.name)}
                </th>
                <th>
                  {formatDateNormalHelper(holiday.date.toString(), 'long')}
                </th>
                <th>
                  <Button onClick={() => handleDelete(holiday)}>Delete</Button>
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
            <ModalHeader>Delete Calendar</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>
                Delete Calendar - {selectedCalendarHoliday?.id} /{' '}
                {selectedCalendarHoliday?.name} /{' '}
                {formatDateNormalHelper(
                  selectedCalendarHoliday?.date.toString() || '',
                  'long'
                )}
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

export default CalendarHolidayTable;
