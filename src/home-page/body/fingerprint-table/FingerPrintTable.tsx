// import React from 'react';
import './FingerPrintTable.css';
import { FingerData } from '../../../common/services/finger-presence/types';
import { Badge as BadgeBase } from '@chakra-ui/react';
import {
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  WarningTwoTone,
} from '@ant-design/icons';
import { capitalizeNameHelper } from '../../../common/services/helper';

type FingerPrintTableProps = {
  label: string;
  fingerData?: FingerData[];
};

const FingerPrintTable = ({ label, fingerData }: FingerPrintTableProps) => {
  // console.log('finger data: ', fingerData);

  return (
    <div className="fingerprint-table-container">
      <div className="fptable-label-container">
        <h1>{label}</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>Badge</th>
            <th>Name</th>
            <th>Position</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {fingerData?.map((finger) => (
            <tr key={finger.fsCardNo}>
              <th>{finger.fsCardNo}</th>
              <th className="fptable-name-text">
                {capitalizeNameHelper(finger.fsName)}
              </th>
              <th>{finger.position.name.toUpperCase()}</th>
              <th>
                {finger.fsLocation.includes('M2') ? (
                  <BadgeBase colorScheme="blue">M2</BadgeBase>
                ) : finger.fsLocation === '' ? null : (
                  <BadgeBase colorScheme="green">{finger.fsLocation}</BadgeBase>
                )}
              </th>
              <th>
                {finger.isLate ? (
                  <WarningTwoTone
                    twoToneColor={'#E4A11B'}
                    style={{ fontSize: '1.3rem' }}
                  />
                ) : finger.absent ? (
                  <CloseSquareTwoTone
                    twoToneColor={'#DC4C64'}
                    style={{ fontSize: '1.3rem' }}
                  />
                ) : (
                  <CheckSquareTwoTone
                    twoToneColor={'#14A44D'}
                    style={{ fontSize: '1.3rem' }}
                  />
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FingerPrintTable;
