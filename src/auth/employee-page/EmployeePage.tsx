import React from 'react';
import NavbarAuth from '../../components/auth/navbar/NavbarAuth';
import HeaderEmployee from './Header/HeaderEmployee';
import EmployeeTable from './employee-table/EmployeeTable';
import EmployeeAddDrawerV2 from './add-new-drawer/EmployeeAddDrawerV2';
import EmployeeEditDrawer from './edit-drawer/EmployeeEditDrawer';
import ArchiveEmployeeConfirmation from './archive-confirmation/ArchiveEmployeeConfirmation';
import { Employee } from '../../common/services/employee/types';
import { useAuth } from '../../common/services/Auth/AuthContext';

const EmployeePage = () => {
  const { user } = useAuth();
  const [searchInputValues, setSearchInputValues] = React.useState('');
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<Employee | null>(null);
  const [isOpenAddEmployeeDrawer, setOpenAddEmployeeDrawer] =
    React.useState(false);
  const [isOpenEditEmployeeDrawer, setOpenEditEmployeeDrawer] =
    React.useState(false);
  const [selectedArchiveEmployee, setSelectedArchiveEmployee] =
    React.useState<Employee | null>(null);
  const [isOpenArchiveModal, setOpenArchiveModal] = React.useState(false);

  React.useEffect(() => {}, [user]);

  const handleDataFromHeader = (data: string) => {
    setSearchInputValues(data);
  };

  const handleDataFromTable = (data: Employee, isDetailOrEdit: boolean) => {
    setSelectedEmployee(data);
    if (isDetailOrEdit === true) {
      setOpenEditEmployeeDrawer(true);
    }
  };

  const handleSelectedArchiveFromTable = (data: Employee) => {
    setSelectedArchiveEmployee(data);
    if (data !== null) {
      setOpenArchiveModal(true);
    }
  };

  const handleCloseArchive = () => {
    setOpenArchiveModal(false);
  };

  const handleOpenAddEmployeeDrawer = () => {
    setOpenAddEmployeeDrawer(true);
  };

  const handleCloseEditEmployeeDrawer = () => {
    setOpenEditEmployeeDrawer(false);
  };

  const handleCloseAddEmployeeDrawer = () => {
    setOpenAddEmployeeDrawer(false);
  };

  return (
    <>
      <NavbarAuth />
      <HeaderEmployee
        sendInputValues={handleDataFromHeader}
        openAddEmployeeDrawer={handleOpenAddEmployeeDrawer}
      />
      <EmployeeTable
        searchInputValues={searchInputValues}
        sendSelectedEmployee={handleDataFromTable}
        sendArchiveEmployee={handleSelectedArchiveFromTable}
      />
      <EmployeeAddDrawerV2
        isOpen={isOpenAddEmployeeDrawer}
        onClose={handleCloseAddEmployeeDrawer}
      />
      {selectedEmployee !== null && (
        <EmployeeEditDrawer
          isOpen={isOpenEditEmployeeDrawer}
          onClose={handleCloseEditEmployeeDrawer}
          employee={selectedEmployee}
        />
      )}
      {selectedArchiveEmployee !== null && (
        <ArchiveEmployeeConfirmation
          employee={selectedArchiveEmployee}
          isOpen={isOpenArchiveModal}
          onClose={handleCloseArchive}
        />
      )}
    </>
  );
};

export default EmployeePage;
