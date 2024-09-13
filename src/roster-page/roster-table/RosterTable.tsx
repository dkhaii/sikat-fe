import React from 'react';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import './RosterTable.css';
import { useGetAllRoster } from '../../common/services/shift-roster/useGetAllRoster';
import { ShiftRoster } from '../../common/services/shift-roster/types';
import LoadingModal from '../../components/common/loading-modal/LoadingModal';
import { CalendarHoliday } from '../../common/services/calendar-holiday/types';
import { useGetCalendarHolidayPerYear } from '../../common/services/calendar-holiday/useGetCalendarHolidaysPerYear.';
import { useFindRosterPerDay } from '../../common/services/shift-roster/useFindRosterPerDay';
import RosterModal from '../roster-modal/RosterModal';

// Define types for groupedRoster object
type GroupedRoster = {
  [monthYear: string]: {
    [day: string]: { [crewID: number]: ShiftRoster[] };
  };
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

const RosterTable: React.FC = () => {
  const { data: shiftRosterData, isLoading: isLoadingRosterData } =
    useGetAllRoster();
  const {
    data: calendarHolidaysData,
    isLoading: isLoadingCalendarHolidaysData,
  } = useGetCalendarHolidayPerYear();
  const [selectedDate, setSelectedDate] = React.useState<string>('');
  const [selectedCrew, setSelectedCrew] = React.useState<number>(0);
  const {
    data: shiftRosterDetailData,
    isLoading: isLoadingShiftRosterDetailData,
    refetch: refetchRosterDetailData,
  } = useFindRosterPerDay(selectedDate, selectedCrew);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleShiftInfoClick = (date: string, crewID: number) => {
    setSelectedDate(date);
    setSelectedCrew(crewID);
    onOpen();
  };

  React.useEffect(() => {
    if (selectedDate && selectedCrew) {
      refetchRosterDetailData();
    }
  }, [selectedDate, selectedCrew, refetchRosterDetailData]);

  // console.log('selected shiftRosterDetailData: ', shiftRosterDetailData);
  // console.log('selectedDate: ', selectedDate);
  // console.log('selectedCrew: ', selectedCrew);

  const renderRoster = (
    rosters: ShiftRoster[],
    holidays: CalendarHoliday[]
  ) => {
    // Group roster by month and day
    const groupedRoster: GroupedRoster = rosters.reduce((acc, rst) => {
      const date = new Date(rst.date);
      const monthYear = `${date.toLocaleString('en-us', {
        month: 'long',
      })} ${date.getFullYear()}`;

      // Initialize monthYear group if it doesn't exist
      if (!acc[monthYear]) {
        acc[monthYear] = {};
      }

      const day = date.getDate().toString();

      // Initialize day group if it doesn't exist
      if (!acc[monthYear][day]) {
        acc[monthYear][day] = {};
      }

      const crewID = rst.crewID;

      // Initialize crewID group if it doesn't exist
      if (!acc[monthYear][day][crewID]) {
        acc[monthYear][day][crewID] = [];
      }

      acc[monthYear][day][crewID].push(rst);
      return acc;
    }, {} as GroupedRoster);

    // Get sorted unique monthYears
    const monthYears: string[] = Object.keys(groupedRoster).sort((a, b) => {
      const [monthA, yearA] = a.split(' ');
      const [monthB, yearB] = b.split(' ');

      const yearDiff = parseInt(yearA) - parseInt(yearB);
      if (yearDiff !== 0) {
        return yearDiff;
      }

      return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    });

    // Check if data is empty
    if (monthYears.length === 0) {
      return (
        <div className="rostertable-container">
          <p>No roster data available.</p>
        </div>
      );
    }

    return monthYears.map((monthYear) => {
      const monthIndex = monthOrder.indexOf(monthYear.split(' ')[0]);
      const year = parseInt(monthYear.split(' ')[1], 10);
      const monthHolidays = holidays.filter((holiday) => {
        const holidayDate = new Date(holiday.date);
        return (
          holidayDate.getFullYear() === year &&
          holidayDate.getMonth() === monthIndex
        );
      });

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
              <Thead style={{ backgroundColor: '#F2F3F6' }}>
                <Tr>
                  <Th>Date</Th>
                  {Object.keys(groupedRoster[monthYear]).map((day) => {
                    const dateStr = `${monthYear.split(' ')[1]}-${(
                      monthOrder.indexOf(monthYear.split(' ')[0]) + 1
                    )
                      .toString()
                      .padStart(2, '0')}-${day.padStart(2, '0')}`;

                    const isHoliday = holidays.some(
                      (holiday) =>
                        new Date(holiday.date).toISOString().split('T')[0] ===
                        new Date(dateStr).toISOString().split('T')[0]
                    );
                    return (
                      <Th
                        key={`${monthYear}-${day}`}
                        style={{
                          backgroundColor: isHoliday ? '#D7263D' : '#F2F3F6',
                          color: isHoliday ? '#fff' : '#343A40',
                        }}
                      >
                        {day}
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(
                  groupedRoster[monthYear][
                    Object.keys(groupedRoster[monthYear])[0]
                  ] || {}
                ).map((crewIDStr) => {
                  const crewID = parseInt(crewIDStr, 10); // Parse string to number
                  return (
                    <Tr key={crewID}>
                      <Td style={{ fontFamily: 'PlusJakartaSansExtraBold' }}>
                        {crewID === 1
                          ? 'Alpha'
                          : crewID === 2
                          ? 'Bravo'
                          : 'Charlie'}
                      </Td>
                      {Object.keys(groupedRoster[monthYear]).map((day) => {
                        const dateStr = `${monthYear.split(' ')[1]}-${(
                          monthOrder.indexOf(monthYear.split(' ')[0]) + 1
                        )
                          .toString()
                          .padStart(2, '0')}-${day.padStart(2, '0')}`;
                        // console.log(dateStr);

                        return (
                          <Td key={`${monthYear}-${day}-${crewID}`}>
                            {groupedRoster[monthYear][day][crewID]?.map(
                              (rst, index) => (
                                <div key={index}>
                                  {rst.shiftTypeID === 1 ? (
                                    <div
                                      className="roster-shiftinfo-dayshift"
                                      onClick={() =>
                                        handleShiftInfoClick(dateStr, crewID)
                                      }
                                      style={{ cursor: 'pointer' }}
                                    >
                                      D
                                    </div>
                                  ) : rst.shiftTypeID === 2 ? (
                                    <div
                                      className="roster-shiftinfo-nightshift"
                                      onClick={() =>
                                        handleShiftInfoClick(dateStr, crewID)
                                      }
                                      style={{ cursor: 'pointer' }}
                                    >
                                      N
                                    </div>
                                  ) : (
                                    <div
                                      className="roster-shiftinfo-offshift"
                                      onClick={() =>
                                        handleShiftInfoClick(dateStr, crewID)
                                      }
                                      style={{ cursor: 'pointer' }}
                                    >
                                      O
                                    </div>
                                  )}
                                </div>
                              )
                            ) || 'O'}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <Box>
            {monthHolidays.length > 0 && (
              <Table style={{ backgroundColor: '#F2F3F6' }} size={'sm'}>
                <Tbody>
                  {monthHolidays.map((holiday) => (
                    <Tr key={holiday.id}>
                      <Td
                        colSpan={
                          Object.keys(groupedRoster[monthYear]).length + 1
                        }
                      >
                        <div
                          style={{
                            color: '#343A40',
                            fontSize: '.8rem',
                          }}
                        >
                          {new Date(holiday.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                          })}{' '}
                          - {holiday.name}
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
        </Box>
      );
    });
  };

  return (
    <>
      {isLoadingRosterData || isLoadingCalendarHolidaysData ? (
        <LoadingModal
          isLoading={isLoadingRosterData || isLoadingCalendarHolidaysData}
          onClose={() => {}}
        />
      ) : shiftRosterData && calendarHolidaysData ? (
        renderRoster(shiftRosterData, calendarHolidaysData)
      ) : (
        <p>No roster data available.</p>
      )}
      {shiftRosterDetailData && (
        <RosterModal
          isOpen={isOpen}
          onClose={onClose}
          rosterData={shiftRosterDetailData}
          isLoading={isLoadingShiftRosterDetailData}
        />
      )}
    </>
  );
};

export default RosterTable;
