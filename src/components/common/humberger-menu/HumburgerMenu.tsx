// import React from 'react';
import './HumbergerMenu.css';
import { Link } from 'react-router-dom';

type HumbergerMenuProps = {
  showLoginPopUp: () => void;
};

const HumburgerMenu = ({ showLoginPopUp }: HumbergerMenuProps) => {
  return (
    <div className="humbergermenu-container">
      <ul>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              showLoginPopUp();
            }}
          >
            Login
          </a>
        </li>
        <li>
          <Link to={'/roster-calendar'}>Shift Roster</Link>
        </li>
      </ul>
    </div>
  );
};

export default HumburgerMenu;
