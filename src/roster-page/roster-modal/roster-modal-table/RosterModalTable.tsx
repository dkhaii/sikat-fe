import {
  Avatar,
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { Employee } from '../../../common/services/employee/types';
import { capitalizeNameHelper } from '../../../common/services/helper';
import { getProfilePictureUrl } from '../../../common/services/employee/api';

type RosterModalTabelProps = {
  // label: string;
  date: Date;
  bintangData: Partial<Employee>[];
  hatariData: Partial<Employee>[];
  jupiterData: Partial<Employee>[];
  floatingData: Partial<Employee>[];
};

const RosterModalTable = ({
  // label,
  date,
  bintangData,
  hatariData,
  jupiterData,
  floatingData,
}: RosterModalTabelProps) => {
  const [profilePictureUrls, setProfilePictureUrls] = React.useState<{
    [key: string]: string;
  }>({});

  React.useEffect(() => {
    const fetchProfilePictures = async (employees: Partial<Employee>[]) => {
      const urls: { [key: string]: string } = {};
      for (const emp of employees) {
        if (emp.profilePicture) {
          const url = await getProfilePictureUrl(
            'profile-picture',
            emp.profilePicture
          );
          urls[emp.id as string] = url || '';
        }
      }
      setProfilePictureUrls(urls);
    };

    const allEmployees = [
      ...bintangData,
      ...hatariData,
      ...jupiterData,
      ...floatingData,
    ];

    fetchProfilePictures(allEmployees);
  }, [bintangData, hatariData, jupiterData, floatingData]);

  const renderEmployees = (employees: Partial<Employee>[]) => {
    return employees.map((emp) => {
      const selectedDate = new Date(date);
      let leaveStatus = '-';

      if (Array.isArray(emp.leavePlan)) {
        for (const leave of emp.leavePlan) {
          // console.log('Employee: ', leave);

          if (leave.isApproved) {
            console.log(
              'leaveStatus: ',
              emp.leavePlan.filter((status) => status.isApproved)
            );
            const startDate = new Date(leave.startDate);
            const endDate = new Date(leave.endDate);

            if (selectedDate >= startDate && selectedDate <= endDate) {
              leaveStatus = leave.leaveStatus?.name.toUpperCase() || '-';
              // console.log('leaveStatus: ', leaveStatus);

              break; // Exit loop if a matching leave plan is found
            }
          }
        }
      }
      return (
        <Tr
          key={emp.id}
          style={
            leaveStatus !== '-'
              ? {
                  backgroundColor: '#ADB5BD',
                }
              : {}
          }
        >
          <Td>{emp.id}</Td>
          <Td>
            <Avatar
              size={'lg'}
              name={capitalizeNameHelper(emp.name || '')}
              src={profilePictureUrls[emp.id as string]}
            />
          </Td>
          <Td>{capitalizeNameHelper(emp.name || '')}</Td>
          <Td>{emp.position?.name.toUpperCase()}</Td>
          <Td>{emp.base?.name.toUpperCase()}</Td>
          <Td>{leaveStatus}</Td>
        </Tr>
      );
    });
  };

  const renderTableSection = (
    label: string,
    employees: Partial<Employee>[]
  ) => (
    <>
      <Heading
        as="h3"
        size="lg"
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '1.2rem',
          backgroundColor: '#F2F3F6',
          padding: '.5rem',
        }}
      >
        {label}
      </Heading>
      <Table size="lg">
        <Thead>
          <Tr>
            <Th width="10%">Badge</Th>
            <Th width="10%"></Th>
            <Th width="25%">Name</Th>
            <Th width="20%">Position</Th>
            <Th width="20%">Base</Th>
            <Th width="15%">Leave Status</Th>
          </Tr>
        </Thead>
        <Tbody>{renderEmployees(employees)}</Tbody>
      </Table>
    </>
  );

  return (
    <>
      <Box>
        <TableContainer>
          {renderTableSection('Bintang', bintangData)}
          {renderTableSection('Hatari', hatariData)}
          {renderTableSection('Jupiter', jupiterData)}
          {renderTableSection('Floating', floatingData)}
        </TableContainer>
      </Box>
    </>
  );
};

export default RosterModalTable;
