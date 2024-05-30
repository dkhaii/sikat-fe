import React from 'react';
import './SummaryInfo.css';
import SummaryInfoCard from './summary-info-card/SummaryInfoCard';
import { TextColor } from '../../../components/common/enums/enums';

const SummaryInfo = () => {
  return (
    <div className="summaryinfo-container">
      <div className="summaryinfo-group-container">
        <SummaryInfoCard total={15} label="Total Crew" />
        <SummaryInfoCard total={1} label="Sick" />
      </div>
      <div className="summaryinfo-group-container">
        <SummaryInfoCard total={9} label="Present" />
        <SummaryInfoCard total={1} label="On Leave" />
      </div>
      <div className="summaryinfo-group-container">
        <SummaryInfoCard total={5} label="Late" />
        <SummaryInfoCard
          total={1}
          label="Absent"
          textColor={TextColor.TEXT_RED}
        />
      </div>
    </div>
  );
};

export default SummaryInfo;
