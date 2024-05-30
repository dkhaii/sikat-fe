import React from 'react';
import './HumbergerMenu.css';

type HumbergerMenuProps = {
  showLoginPopUp: () => void;
};

const HumburgerMenu = ({ showLoginPopUp }: HumbergerMenuProps) => {
  return (
    <div className="humbergermenu-container">
      <ul>
        <li>
          <a
            // href="#"
            onClick={(e) => {
              e.preventDefault();
              showLoginPopUp();
            }}
          >
            Login
          </a>
        </li>
        <li>
          <a>Shift Roster</a>
        </li>
      </ul>
    </div>
  );
};

export default HumburgerMenu;
