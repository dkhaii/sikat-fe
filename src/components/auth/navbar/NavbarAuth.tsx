import React from 'react';
import sikatLogo from '/sikat-logo.png';
import moLogo from '/mo-logo.png';
import './NavbarAuth.css';
import HumbergerMenuAuth from '../humberger-menu-auth/HumbergerMenuAuth';

const NavbarAuth = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbarauth-container">
      <div className="navbarauth-logos-container">
        <div className="navbarauth-sikatlogo-container">
          <img src={sikatLogo} alt="sikatlogo" />
        </div>
        <div className="navbarauth-kpclogos-container"></div>
      </div>
      <div className="navbarauth-info-container">
        <div className="navbarauth-mologo">
          <img src={moLogo} alt="mo-logo" />
        </div>
        <div className="navbarauth-humberger-container">
          <div className="navbarauth-hamburger" onClick={toggleMenu}>
            {showMenu ? (
              <>
                <div className="navbarauth-line"></div>
                <div className="navbarauth-line"></div>
                <div className="navbarauth-line"></div>
              </>
            ) : (
              <>
                <div className="navbarauth-line"></div>
                <div className="navbarauth-line"></div>
                <div className="navbarauth-line"></div>
              </>
            )}
          </div>
        </div>
        {showMenu && <HumbergerMenuAuth />}
      </div>
    </nav>
  );
};

export default NavbarAuth;
