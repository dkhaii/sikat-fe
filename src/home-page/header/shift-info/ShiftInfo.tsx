import { ShiftRoster } from '../../../common/services/shift-roster/types';
import { useGetRosterPerDay } from '../../../common/services/shift-roster/useGetRosterPerDay';
import LoadingModal from '../../../components/common/loading-modal/LoadingModal';
import './ShiftInfo.css';

const ShiftInfo = () => {
  const { data, isLoading } = useGetRosterPerDay();

  // console.log('useGetRosterPerDay: ', data);

  const renderInfo = (shiftRoster: ShiftRoster[]) => {
    const currentDate = new Date();

    // Separate dayshift and nightshift
    const dayShifts = shiftRoster.filter(
      (shift) => shift.workShift.name.toLowerCase() === 'day'
    );
    // console.log('dayShift: ', dayShifts);

    const nightShifts = shiftRoster.filter(
      (shift) => shift.workShift.name.toLowerCase() === 'night'
    );
    // console.log('nightShift: ', nightShifts);

    const renderShift = (shifts: ShiftRoster[]) => {
      return shifts.map((shift) => (
        <div key={shift.id} className="shiftinfo-container">
          <div className={`dayshift-info-container `}>
            <h1
              className={`${
                shift.workShift.name.toLowerCase() === 'day'
                  ? 'day-text'
                  : 'night-text'
              }`}
            >
              {shift.workShift.name.toUpperCase()}
            </h1>
            <h1>{shift.shiftCount}</h1>
          </div>
          <div className="crewshift-info-container">
            <h2>CREW {shift.crew.name.toUpperCase()}</h2>
          </div>
        </div>
      ));
    };

    return (
      <div>
        {currentDate.getHours() >= 7 && currentDate.getHours() < 19
          ? renderShift(dayShifts)
          : renderShift(nightShifts)}
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingModal isLoading={isLoading} onClose={() => {}} />
      ) : (
        renderInfo(data || [])
      )}
    </>
  );
};

export default ShiftInfo;
