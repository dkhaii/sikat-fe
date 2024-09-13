import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import LoadingModal from '../../../components/common/loading-modal/LoadingModal';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Employee } from '../../../common/services/employee/types';
import { useGetEmployees } from '../../../common/services/employee/useGetEmployees';
import { useFindEmployeeByName } from '../../../common/services/employee/useFindEmployeeByName';
import EmployeeDetailsModal from '../employee-detail-modal/EmployeeDetailsModal';
import RotationDrawer from '../rotation-drawer/RotationDrawer';
import UpdateRotationDrawer from '../update-rotation-drawer/UpdateRotationDrawer';
import { capitalizeNameHelper } from '../../../common/services/helper';

type EmployeeTableProps = {
  searchInputValues: string;
  sendSelectedEmployee: (employee: Employee, isDetailOrEdit: boolean) => void;
  sendArchiveEmployee: (employee: Employee) => void;
};

const EmployeeTable = ({
  searchInputValues,
  sendSelectedEmployee,
  sendArchiveEmployee,
}: EmployeeTableProps) => {
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<Employee | null>(null);
  const [isOpenRotationDrawer, setOpenRotationDrawer] = React.useState(false);
  const [isOpenUpdateRotationDrawer, setOpenUpdateRotationDrawer] =
    React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data: employees,
    isLoading,
    refetch: refetchGetEmployees,
  } = useGetEmployees();
  const {
    data,
    isLoading: isLoadingEmployeeSearchResult,
    refetch: refetchEmployeeSearch,
    isError,
    error,
  } = useFindEmployeeByName(searchInputValues);

  const employeeSearchResult: Employee[] = data || [];

  React.useEffect(() => {
    if (searchInputValues) {
      // console.log('searchInptValues: ', searchInputValues);
      refetchEmployeeSearch();
    }
    if (searchInputValues === '') {
      // console.log('searchInptValues: ', searchInputValues);

      refetchEmployeeSearch();
    }
  }, [searchInputValues, refetchEmployeeSearch, refetchGetEmployees]);

  const toast = useToast();
  React.useEffect(() => {
    if (isError) {
      // console.log(error);
      toast({
        title: 'Error',
        description: `${JSON.stringify(error?.message)}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError, error, toast]);

  const handleArchiveClick = (employee: Employee) => {
    sendArchiveEmployee(employee);
  };

  const handleEmployeeClickDetail = (employee: Employee) => {
    setSelectedEmployee(employee);
    onOpen();
  };

  const handleEmployeeEditClick = (employee: Employee) => {
    sendSelectedEmployee(employee, true);
  };

  const handleSetRotation = () => {
    setOpenRotationDrawer(true);
    onClose();
  };

  const handleUpdateRotation = () => {
    setOpenUpdateRotationDrawer(true);
    onClose();
  };

  const renderEmployee = (employeeList: Employee[]) => {
    const sortedEmployees = [...employeeList].sort((a, b) => {
      // Sort by crew ID first
      if (a.crew?.id !== b.crew?.id) {
        return (a.crew?.id || 0) - (b.crew?.id || 0);
      }
      // Then by isArchived status
      if (a.isArchived && !b.isArchived) {
        return 1;
      }
      if (!a.isArchived && b.isArchived) {
        return -1;
      }
      return 0;
    });

    return sortedEmployees.map((employee) => (
      <Tr
        key={employee.id}
        style={
          employee.isArchived == true ? { backgroundColor: '#ADB5BD' } : {}
        }
      >
        <Td>{employee.id}</Td>
        <Td
          onClick={() => handleEmployeeClickDetail(employee)}
          style={{ cursor: 'pointer' }}
        >
          {capitalizeNameHelper(employee.name)}
        </Td>
        <Td>{employee.position.name.toUpperCase()}</Td>
        <Td>{employee.crew?.name.toUpperCase()}</Td>
        <Td>{employee.base?.name.toUpperCase()}</Td>
        <Td>{employee.pit?.name.toUpperCase() || '-'}</Td>
        <Td>{employee.isArchived === true ? 'ARCHIVED' : 'ACTIVE'}</Td>
        <Td display={'flex'} gap={'.5rem'}>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEmployeeEditClick(employee)}
          />
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => handleArchiveClick(employee)}
            danger
          />
        </Td>
      </Tr>
    ));
  };

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead backgroundColor={'#F2F3F6'}>
            <Tr>
              <Th width={'5rem'}>Badge</Th>
              <Th width={'25rem'}>Name</Th>
              <Th width={'25rem'}>Position</Th>
              <Th width={'8rem'}>Crew</Th>
              <Th width={'8rem'}>Base</Th>
              <Th width={'8rem'}>Pit</Th>
              <Th width={'8rem'}>Status</Th>
              <Th width={'10rem'}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employeeSearchResult.length > 0
              ? renderEmployee(employeeSearchResult)
              : renderEmployee(employees || [])}
          </Tbody>
        </Table>
      </TableContainer>
      {isLoading && <LoadingModal isLoading={isLoading} onClose={() => {}} />}
      {isLoadingEmployeeSearchResult && employeeSearchResult.length === 0 && (
        <LoadingModal
          isLoading={isLoadingEmployeeSearchResult}
          onClose={() => {}}
        />
      )}
      {isOpen && selectedEmployee && (
        <EmployeeDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          employeeID={selectedEmployee.id}
          onSetRotation={handleSetRotation}
          onUpdateRotation={handleUpdateRotation}
        />
      )}
      {isOpenRotationDrawer && selectedEmployee ? (
        <RotationDrawer
          isOpen={isOpenRotationDrawer}
          onClose={() => {
            setOpenRotationDrawer(false);
          }}
          employee={selectedEmployee}
        />
      ) : null}
      {isOpenUpdateRotationDrawer && selectedEmployee ? (
        <UpdateRotationDrawer
          isOpen={isOpenUpdateRotationDrawer}
          onClose={() => {
            setOpenUpdateRotationDrawer(false);
          }}
          employee={selectedEmployee}
        />
      ) : null}
    </>
  );
};

export default EmployeeTable;
