// import React from 'react';
import './SummaryInfoCard.css';
import { TextColor } from '../../../../common/enums/enums';

type SummaryInforCardProps = {
  total: number;
  label: string;
  textColor?: TextColor;
};

const SummaryInfoCard = ({
  total,
  label,
  textColor = TextColor.TEXT_DEFAULT,
}: SummaryInforCardProps) => {
  return (
    <div className={textColor}>
      <h1>{total}</h1>
      <h2>{label}</h2>
    </div>
  );
};

export default SummaryInfoCard;
