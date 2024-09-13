import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import './LeavePlanHeader.css';
import { useDisclosure } from '@chakra-ui/react';
import LeavePlanModalCreate from '../leaveplan-modal-create/LeavePlanModalCreate';

const LeavePlanHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1080);

  const handleScroll = () => {
    if (headerRef.current) {
      setIsSticky(window.scrollY > headerRef.current.offsetTop);
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1080);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    };
  }, []);

  const handleBookButtonClick = () => {
    onOpen();
  };

  return (
    <>
      <div
        ref={headerRef}
        className={`leaveplan-header-container ${
          isSticky ? 'sticky-leaveplan-header' : ''
        }`}
      >
        <div className="leaveplan-header-cutiinfo">
          <div className="legend-cutiinfo-container">
            <div className="legend-cutiinfo-container-top">
              <div className="leaveplan-cutiinfo-annualleave-container">
                <h1>
                  ANNUAL <br />
                  LEAVE
                </h1>
                <div className="legend-cutiinfo-container">
                  <div className="leaveplan-cutiinfo-annualleave"></div>
                </div>
              </div>
              <div className="leaveplan-cutiinfo-outstandingleave-container">
                <h1>
                  OS <br />
                  LEAVE
                </h1>
                <div className="legend-cutiinfo-container">
                  <div className="leaveplan-cutiinfo-outstandingleave"></div>
                </div>
              </div>
              <div className="leaveplan-cutiinfo-sick-container">
                <h1>SICK</h1>
                <div className="legend-cutiinfo-container">
                  <div className="leaveplan-cutiinfo-sick"></div>
                </div>
              </div>
              <div className="leaveplan-cutiinfo-training-container">
                <h1>BISTRIP</h1>
                <div className="legend-cutiinfo-container">
                  <div className="leaveplan-cutiinfo-training"></div>
                </div>
              </div>
              <div className="leaveplan-cutiinfo-mcu-container">
                <h1>MCU</h1>
                <div className="legend-cutiinfo-container">
                  <div className="leaveplan-cutiinfo-mcu"></div>
                </div>
              </div>
            </div>
            <div className="legend-cutiinfo-container-bottom">
              <div className="leaveplan-cutiinfo-lwop-container">
                <h1>LWOP</h1>
                <div className="legend-cutiinfo-container">
                  <div className="leaveplan-cutiinfo-lwop"></div>
                </div>
              </div>
              <div className="leaveplan-cutiinfo-lwp-container">
                <h1>LWP</h1>
                <div className="legend-cutiinfo-container">
                  <div className="leaveplan-cutiinfo-lwp"></div>
                </div>
              </div>
              <div className="leaveplan-cutiinfo-menemanirujukan-container">
                <h1>REFERAL</h1>
                <div className="legend-cutiinfo-container">
                  <div className="leaveplan-cutiinfo-menemanirujukan"></div>
                </div>
              </div>
              <div className="leaveplan-cutiinfo-sqr-container">
                <h1>SQR</h1>
                <div className="legend-cutiinfo-container">
                  <div className="leaveplan-cutiinfo-sqr"></div>
                </div>
              </div>
              <div className="leaveplan-cutiinfo-longleave-container">
                <h1>
                  LONG <br />
                  LEAVE
                </h1>
                <div className="legend-cutiinfo-container">
                  <div className="leaveplan-cutiinfo-longleave"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            isMobile && isSticky
              ? 'leaveplan-title-hide'
              : 'leaveplan-title-container'
          }
        >
          <h1>Leave Plan</h1>
        </div>
        <div className="leaveplan-input-container">
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleBookButtonClick()}
          >
            Book Cuti
          </Button>
        </div>
      </div>
      {isOpen && <LeavePlanModalCreate isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default LeavePlanHeader;
