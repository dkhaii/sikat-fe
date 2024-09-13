// import React from 'react';
import NavbarAuth from '../../components/auth/navbar/NavbarAuth';
import LeavePlanHeader from './header/LeavePlanHeader';
import LeavePlanTable from './leaveplan-table/LeavePlanTable';
import './LeavePlanPage.css';

const LeavePlanPage = () => {
  return (
    <>
      <NavbarAuth />
      <LeavePlanHeader />
      <div className="leaveplan-table-container">
        <LeavePlanTable />
      </div>
    </>
  );
};

export default LeavePlanPage;
