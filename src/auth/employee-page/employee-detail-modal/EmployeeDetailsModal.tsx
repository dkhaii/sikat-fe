import React from 'react';
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import LoadingSpinner from '../../../components/common/loading-spinner/LoadingSpinner';
import {
  capitalizeNameHelper,
  formatDateHelper,
} from '../../../common/services/helper';
import { useFindOneEmployeeByID } from '../../../common/services/employee/useFindOneEmployeeByID';
import './EmployeeDetailsModal.css';
import { getProfilePictureUrl } from '../../../common/services/employee/api';
import { useCheckExistingRotation } from '../../../common/services/rotation/useCheckExistingRotation';

type EmployeeDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  employeeID: string;
  onSetRotation: () => void;
  onUpdateRotation: () => void;
};

const EmployeeDetailsModal = ({
  isOpen,
  onClose,
  employeeID,
  onSetRotation,
  onUpdateRotation,
}: EmployeeDetailsModalProps) => {
  const { data: isExist } = useCheckExistingRotation(employeeID);
  const { data, isLoading } = useFindOneEmployeeByID(employeeID);

  const [profilePictureUrl, setProfilePictureUrl] = React.useState<string>('');

  React.useEffect(() => {
    const fetchProfilePictureUrl = async () => {
      setProfilePictureUrl('No Profile Picture');
      if (data?.profilePicture) {
        const url = await getProfilePictureUrl(
          'profile-picture',
          data.profilePicture
        );
        setProfilePictureUrl(url || '');
      }
    };

    fetchProfilePictureUrl();
  }, [data]);

  const formattedDateOfBirth = data?.dateOfBirth
    ? formatDateHelper(data.dateOfBirth.toString(), 'long')
    : '-';
  const formattedDateOfHire = data?.dateOfHire
    ? formatDateHelper(data.dateOfHire.toString(), 'long')
    : '-';

  const hanldeSetRotation = () => {
    onSetRotation();
    onClose();
  };

  const handleUpdateRotation = () => {
    onUpdateRotation();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <ModalHeader>Employee Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="employees-detail-container">
                    <div className="employees-detail-title-container">
                      <Image
                        boxSize="200px"
                        objectFit="cover"
                        src={profilePictureUrl}
                        alt={data?.profilePicture}
                        style={{ marginBottom: '1.5rem' }}
                      />
                      <h1 className="employees-detail-title-name">
                        {capitalizeNameHelper(data?.name || '')}
                      </h1>
                      <h1>ID: {data?.id}</h1>
                      <h1>Position: {data?.position?.name.toUpperCase()}</h1>
                      <h1>Crew: {data?.crew?.name.toUpperCase()}</h1>
                    </div>
                    <div className="employees-detail-info-container">
                      <div className="employees-detail-info-title">
                        <h1>Pit :</h1>
                        <h1>Base :</h1>
                        <h1>Date Of Birth :</h1>
                        <h1>Date Of Hire :</h1>
                      </div>
                      <div className="employees-detail-info-data">
                        <h1>{data?.pit?.name.toUpperCase() || '-'}</h1>
                        <h1>{data?.base?.name.toUpperCase() || '-'}</h1>
                        <h1>{formattedDateOfBirth || '-'}</h1>
                        <h1>{formattedDateOfHire || '-'}</h1>
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                {isExist ? (
                  <Button
                    colorScheme="yellow"
                    mr={3}
                    onClick={handleUpdateRotation}
                  >
                    Update Rotation
                  </Button>
                ) : (
                  <Button colorScheme="blue" mr={3} onClick={hanldeSetRotation}>
                    Set Rotation
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmployeeDetailsModal;
