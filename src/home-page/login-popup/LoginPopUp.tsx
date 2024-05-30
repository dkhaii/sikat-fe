import React from 'react';
import './LoginPopUp.css';
import moLogo from '/mo-logo.png';

type LoginPopUpProps = {
  onClose: () => void;
};

const LoginPopUp = ({ onClose }: LoginPopUpProps) => {
  return (
    <div className="login-container">
      <div className="login-modal-container">
        <div className="login-close-container" onClick={onClose}>
          <div className="loginclose-line-one"></div>
          <div className="loginclose-line-two"></div>
        </div>
        <div className="login-content-container">
          <div className="login-logo-container">
            <img src={moLogo} alt="moLogo" />
          </div>
          <form action="">
            <div className="login-input-container">
              <h1>Badge Number</h1>
              <input type="text" placeholder="Enter your badge" />
            </div>
            <div className="login-input-container">
              <h1>Password</h1>
              <input type="password" placeholder="Enter your password" />
            </div>
            <div className="login-button-container">
              <button>LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPopUp;
