import React from 'react';
import sikatLogo from '/sikat-logo.png';
import kpcLogo from '/kpc-logo.png';
import moLogo from '/mo-logo.png';
import './Navbar.css';
import HumburgerMenu from '../humberger-menu/HumburgerMenu';

type NavbarProps = {
  showLoginPopUp: () => void;
};

const Navbar = ({ showLoginPopUp }: NavbarProps) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar-container">
      <div className="logos-container">
        <div className="sikat-logo-container">
          <img src={sikatLogo} alt="sikat-logo" />
        </div>
        <div className="kpc-logos-container">
          <div className="kpc-logo">
            <img src={kpcLogo} alt="kpc-logo" />
          </div>
          <div className="mo-logo">
            <img src={moLogo} alt="mo-logo" />
          </div>
        </div>
      </div>
      <div className="info-container">
        <div className="humberger-container">
          <div className="hamburger" onClick={toggleMenu}>
            {showMenu ? (
              <>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </>
            ) : (
              <>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </>
            )}
          </div>
        </div>
        {showMenu && <HumburgerMenu showLoginPopUp={showLoginPopUp} />}
      </div>
    </nav>
  );
};

export default Navbar;
