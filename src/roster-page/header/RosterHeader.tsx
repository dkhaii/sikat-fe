import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import './RosterHeader.css';
import { Link } from 'react-router-dom';
import AddEventCalendarModal from './add-event-calendar/AddEventCalendarModal';
import { useAuth } from '../../common/services/Auth/AuthContext';

const RosterHeader = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenAddEventCalendarModal = () => {
    onOpen();
  };

  return (
    <>
      <div className="roster-header-container">
        <div className="roster-shiftinfo-with-button">
          <div className="roster-shiftinfo-container">
            <div className="roster-shiftinfo-dayshift-container">
              <h1>DAY</h1>
              <div className="roster-shiftinfo-dayshift"></div>
            </div>
            <div className="roster-shiftinfo-nightshift-container">
              <h1>NIGHT</h1>
              <div className="roster-shiftinfo-nightshift"></div>
            </div>
            <div className="roster-shiftinfo-offshift-container">
              <h1>OFF</h1>
              <div className="roster-shiftinfo-offshift"></div>
            </div>
          </div>
          {user?.role === 1 ? (
            <Button
              size="sm"
              style={{
                backgroundColor: '#212529',
                color: '#fff',
                paddingLeft: '1rem',
                paddingRight: '1rem',
              }}
              onClick={() => handleOpenAddEventCalendarModal()}
            >
              Add Event
            </Button>
          ) : null}
        </div>
        <div className="roster-title-container">
          <h1>
            Shift Roster 2024 <span>Mine Control and Dispatch</span>
          </h1>
        </div>
        <div className="roster-back-container">
          <Link to={'/'}>
            <Button
              size="sm"
              style={{
                backgroundColor: '#212529',
                color: '#fff',
                paddingLeft: '1rem',
                paddingRight: '1rem',
              }}
            >
              Back
            </Button>
          </Link>
        </div>
      </div>
      {isOpen ? (
        <AddEventCalendarModal isOpen={isOpen} onClose={onClose} />
      ) : null}
    </>
  );
};

export default RosterHeader;
