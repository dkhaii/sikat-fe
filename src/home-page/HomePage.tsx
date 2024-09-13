import Navbar from '../components/common/Navbar/Navbar';
import BodyHome from './body/BodyHome';
import HeaderHome from './header/HeaderHome';
import LoginPopUp from './login-popup/LoginPopUp';
import './HomePage.css';
import React from 'react';

const HomePage = () => {
  const [showLoginPopUp, setShowLoginPopup] = React.useState(false);

  const handleShowLoginOnClick = () => {
    setShowLoginPopup(true);
  };

  const handleCloseLoginOnClick = () => {
    setShowLoginPopup(false);
  };

  return (
    <div>
      <div
        className={`login-popup-container ${
          showLoginPopUp
            ? 'login-popup-container-show'
            : 'login-popup-container-hide'
        }`}
      >
        <LoginPopUp isOpen={showLoginPopUp} onClose={handleCloseLoginOnClick} />
      </div>
      <Navbar showLoginPopUp={handleShowLoginOnClick} />
      <HeaderHome />
      <BodyHome />
    </div>
  );
};

export default HomePage;
