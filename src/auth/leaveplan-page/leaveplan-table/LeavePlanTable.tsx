import React from 'react';
import { useGetLeavePlanPerYear } from '../../../common/services/leave-plan/useGetLeavePlanPerYear';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { LeavePlan } from '../../../common/services/leave-plan/types';
import LoadingModal from '../../../components/common/loading-modal/LoadingModal';
import './LeavePlanTable.css';
import LeavePlanModal from '../leaveplan-modal/LeavePlanModal';
import LeavePlanEditDrawer from '../leaveplan-edit-drawer/LeavePlanEditDrawer';
import { Button, Flex } from 'antd';

type GroupedLeavePlan = {
  [monthYear: string]: LeavePlan[];
};

const monthOrder = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const crewOrder = [1, 2, 3, 4];

const LeavePlanTable: React.FC = () => {
  const { data: leavePlanData, error, isLoading } = useGetLeavePlanPerYear();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLeavePlan, setSelectedLeavePlan] =
    React.useState<LeavePlan | null>(null);
  const [isEditDrawerOpen, setEditDrawerOpen] = React.useState(false); // State for edit drawer
  const [visibleSummaries, setVisibleSummaries] = React.useState<string[]>([]);

  const handleEmployeeClickDetail = (leavePlan: LeavePlan) => {
    setSelectedLeavePlan(leavePlan);
    onOpen();
  };

  const handleEdit = () => {
    setEditDrawerOpen(true); // Open the edit drawer
    onClose(); // Close the modal
  };

  if (error) return <div>Error fetching data</div>;

  const renderLeavePlan = (leavePlanData: LeavePlan[], year: number) => {
    // Group leave plans by month and year
    const groupedLeavePlans: GroupedLeavePlan = leavePlanData.reduce(
      (acc, lp) => {
        const startDate = new Date(lp.startDate);
        const endDate = new Date(lp.endDate);

        // Ensure end date does not overflow into the next day
        endDate.setHours(23, 59, 59, 999);

        // Determine all months affected by this leave plan
        let currentMonth = startDate.getMonth();
        let currentYear = startDate.getFullYear();
        while (
          currentYear < endDate.getFullYear() ||
          (currentYear === endDate.getFullYear() &&
            currentMonth <= endDate.getMonth())
        ) {
          const monthYear = `${monthOrder[currentMonth]} ${currentYear}`;

          if (!acc[monthYear]) {
            acc[monthYear] = [];
          }

          acc[monthYear].push(lp);

          // Move to the next month
          currentMonth++;
          if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
          }
        }

        return acc;
      },
      {} as GroupedLeavePlan
    );

    // Get sorted unique monthYears
    const monthYears: string[] = Object.keys(groupedLeavePlans).sort((a, b) => {
      const [monthA, yearA] = a.split(' ');
      const [monthB, yearB] = b.split(' ');

      const yearDiff = parseInt(yearA) - parseInt(yearB);
      if (yearDiff !== 0) {
        return yearDiff;
      }

      return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    });

    if (monthYears.length === 0) {
      return (
        <div className="leaveplan-table-container">
          <p>No leave plans available.</p>
        </div>
      );
    }

    return monthYears.map((monthYear) => {
      const monthIndex = monthOrder.indexOf(monthYear.split(' ')[0]);

      // Determine number of days in the month
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

      const sortedLeavePlans = groupedLeavePlans[monthYear].sort((a, b) => {
        const crewA = a.employee?.crew?.id || 0;
        const crewB = b.employee?.crew?.id || 0;
        return crewOrder.indexOf(crewA) - crewOrder.indexOf(crewB);
      });

      const leaveSummary: {
        [statusName: string]: { days: number; people: number };
      } = {};

      sortedLeavePlans.forEach((leavePlan) => {
        if (
          leavePlan.leaveStatus &&
          leavePlan.leaveStatus.id !== undefined &&
          leavePlan.isApproved
        ) {
          const startDate = new Date(leavePlan.startDate);
          const endDate = new Date(leavePlan.endDate);

          // endDate.setDate(endDate.getDate() + 1);

          for (
            let date = new Date(startDate);
            date <= endDate;
            date.setDate(date.getDate() + 1)
          ) {
            if (date.getFullYear() === year && date.getMonth() === monthIndex) {
              if (!leaveSummary[leavePlan.leaveStatus.name]) {
                leaveSummary[leavePlan.leaveStatus.name] = {
                  days: 0,
                  people: 0,
                };
              }
              leaveSummary[leavePlan.leaveStatus.name].days++;
            }
          }

          if (leaveSummary[leavePlan.leaveStatus.name]) {
            leaveSummary[leavePlan.leaveStatus.name].people++;
          }
        }
      });

      const handleShowSummary = () => {
        setVisibleSummaries((prev) =>
          prev.includes(monthYear)
            ? prev.filter((summary) => summary !== monthYear)
            : [...prev, monthYear]
        );
      };

      return (
        <Box key={monthYear} mb={10}>
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
            {monthYear}
          </Heading>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Badge</Th>
                  <Th>Name</Th>
                  <Th>Crew</Th>
                  {/* Generate sticky headers for each day of the month */}
                  {Array.from({ length: daysInMonth }, (_, index) => (
                    <Th
                      key={index + 1}
                      style={{
                        position: 'sticky',
                        top: '0',
                        backgroundColor: '#F2F3F6',
                      }}
                    >
                      {index + 1}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {sortedLeavePlans.map((leavePlan, lpIndex) => (
                  <Tr key={`${leavePlan.employeeID}-${lpIndex}`}>
                    <Td>{leavePlan.employeeID}</Td>
                    <Td
                      onClick={() => handleEmployeeClickDetail(leavePlan)}
                      style={{ cursor: 'pointer' }}
                    >
                      {leavePlan.employee?.name}
                    </Td>
                    <Td>{leavePlan.employee?.crew?.name.toUpperCase()}</Td>
                    {/* Generate table cells for each day of the month */}
                    {Array.from({ length: daysInMonth }, (_, dayIndex) => {
                      const currentDate = new Date(year, monthIndex, dayIndex);
                      const isWithinRange =
                        currentDate.setHours(0, 0, 0, 0) >=
                          new Date(leavePlan.startDate).setHours(0, 0, 0, 0) &&
                        currentDate.setHours(0, 0, 0, 0) <=
                          new Date(leavePlan.endDate).setHours(23, 59, 59, 999);

                      return (
                        <Td
                          key={dayIndex + 1}
                          className={
                            isWithinRange
                              ? leavePlan.isApproved
                                ? leavePlan.leaveStatus?.id === 1
                                  ? 'leaveplan-periode-info-annualleave'
                                  : leavePlan.leaveStatus?.id === 2
                                  ? 'leaveplan-periode-info-outstandingleave'
                                  : leavePlan.leaveStatus?.id === 3
                                  ? 'leaveplan-periode-info-sick'
                                  : leavePlan.leaveStatus?.id === 4
                                  ? 'leaveplan-periode-info-training'
                                  : leavePlan.leaveStatus?.id === 5
                                  ? 'leaveplan-periode-info-mcu'
                                  : leavePlan.leaveStatus?.id === 6
                                  ? 'leaveplan-periode-info-lwop'
                                  : leavePlan.leaveStatus?.id === 7
                                  ? 'leaveplan-periode-info-lwp'
                                  : leavePlan.leaveStatus?.id === 8
                                  ? 'leaveplan-periode-info-menemanirujukan'
                                  : leavePlan.leaveStatus?.id === 9
                                  ? 'leaveplan-periode-info-sqr'
                                  : leavePlan.leaveStatus?.id === 10
                                  ? 'leaveplan-periode-info-longleave'
                                  : ''
                                : leavePlan.leaveStatus?.id === 1
                                ? 'leaveplan-periode-info-booking-annualleave'
                                : leavePlan.leaveStatus?.id === 2
                                ? 'leaveplan-periode-info-booking-outstandingleave'
                                : leavePlan.leaveStatus?.id === 3
                                ? 'leaveplan-periode-info-booking-sick'
                                : leavePlan.leaveStatus?.id === 4
                                ? 'leaveplan-periode-info-booking-training'
                                : leavePlan.leaveStatus?.id === 5
                                ? 'leaveplan-periode-info-booking-mcu'
                                : leavePlan.leaveStatus?.id === 6
                                ? 'leaveplan-periode-info-booking-lwop'
                                : leavePlan.leaveStatus?.id === 7
                                ? 'leaveplan-periode-info-booking-lwp'
                                : leavePlan.leaveStatus?.id === 8
                                ? 'leaveplan-periode-info-booking-menemanirujukan'
                                : leavePlan.leaveStatus?.id === 9
                                ? 'leaveplan-periode-info-booking-sqr'
                                : leavePlan.leaveStatus?.id === 10
                                ? 'leaveplan-periode-info-booking-longleave'
                                : ''
                              : ''
                          }
                        ></Td>
                      );
                    })}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Box mt={4} p={4} borderRadius="md" backgroundColor="gray.100">
            <Flex justify={'space-between'}>
              <Heading as="h4" size="md" mb={4}>
                Leave Summary for {monthYear}
              </Heading>
              <Button onClick={handleShowSummary}>
                {visibleSummaries.includes(monthYear) ? 'Close' : ' Show'}
              </Button>
            </Flex>
            {visibleSummaries.includes(monthYear) && (
              <ul>
                {Object.keys(leaveSummary).map((statusName) => (
                  <>
                    <Box key={statusName} mb={2}>
                      <strong>{statusName}</strong>
                      <p>
                        Days: {leaveSummary[statusName].days}
                        <br />
                        People: {leaveSummary[statusName].people}
                      </p>
                    </Box>
                  </>
                ))}
              </ul>
            )}
          </Box>
        </Box>
      );
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingModal isLoading={isLoading} onClose={() => {}} />
      ) : (
        renderLeavePlan(leavePlanData || [], new Date().getFullYear())
      )}
      {isOpen && (
        <LeavePlanModal
          isOpen={isOpen}
          onClose={onClose}
          leavePlanID={selectedLeavePlan?.id || undefined}
          onEdit={handleEdit}
        />
      )}
      {isEditDrawerOpen && selectedLeavePlan?.id !== undefined ? (
        <LeavePlanEditDrawer
          isOpen={isEditDrawerOpen}
          onClose={() => {
            setEditDrawerOpen(false);
          }}
          leavePlanID={selectedLeavePlan?.id}
          employeeID={selectedLeavePlan.employeeID}
        />
      ) : null}
    </>
  );
};

export default LeavePlanTable;
