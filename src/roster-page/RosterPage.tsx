import React from 'react';
import RosterHeader from './header/RosterHeader';
import RosterTable from './roster-table/RosterTable';
import './RosterPage.css'

const RosterPage = () => {
  return (
    <>
      <RosterHeader />
      <div className="roster-body-container">
        <RosterTable />
      </div>
    </>
  );
};

export default RosterPage;
