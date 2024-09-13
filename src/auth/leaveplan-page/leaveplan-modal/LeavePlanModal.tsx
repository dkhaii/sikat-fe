import React from 'react';
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import './LeavePlanModal.css';
import { Badge, message } from 'antd';
import { useGetLeavePlanByID } from '../../../common/services/leave-plan/useGetLeavePlanByID';
import LoadingSpinner from '../../../components/common/loading-spinner/LoadingSpinner';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { getLeavePlanFileByID } from '../../../common/services/leave-plan/api';
import { useAuth } from '../../../common/services/Auth/AuthContext';
import { useApproveLeavePlan } from '../../../common/services/leave-plan/useApproveLeavePlan';
import {
  capitalizeNameHelper,
  formatDateHelper,
} from '../../../common/services/helper';
import { useDeleteLeavePlan } from '../../../common/services/leave-plan/useDeleteLeavePlan';

type LeavePlanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  leavePlanID: number | undefined;
  onEdit: () => void;
};

const LeavePlanModal = ({
  isOpen,
  onClose,
  leavePlanID,
  onEdit,
}: LeavePlanModalProps) => {
  const { data, isLoading } = useGetLeavePlanByID(leavePlanID || 0);
  const { user } = useAuth();
  const [isApproving, setIsApproving] = React.useState(false);

  const { mutate: mutateApprovePlan } = useApproveLeavePlan(
    () => {
      message.success('Leave plan has been approved');
      onClose();
    },
    () => {
      message.error('Failed to approve leave plan');
    }
  );

  const { mutate: mutateDeleteLeavePlan } = useDeleteLeavePlan(
    () => {
      message.success('Delete leave plan successfully');
      onClose();
    },
    (error) => {
      message.error(`Error: ${error}`);
    }
  );

  if (typeof leavePlanID === 'undefined') {
    return null;
  }

  const handleOpenFileNewWindow = async () => {
    if (data?.formCuti) {
      const folder = 'leave-plan-form'; // Ganti dengan folder yang sesuai
      const fileName = data.formCuti; // Pastikan fileName sudah berisi nama file saja
      const fileUrl = await getLeavePlanFileByID(folder, fileName);
      window.open(fileUrl, '_blank');
    }
  };

  const handleApproveLeavePlan = async () => {
    setIsApproving(true);

    if (data?.id) {
      await mutateApprovePlan(data?.id);
    }

    setIsApproving(false);
  };

  const handleEdit = () => {
    onEdit(); // Trigger opening of the edit drawer
    onClose(); // Close the modal
  };

  const confirmDelete = (id: number) => {
    mutateDeleteLeavePlan(id);
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
              <ModalHeader>Leave Plan Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {isApproving ? (
                  <LoadingSpinner />
                ) : (
                  <div className="leaveplan-detail-container">
                    <div className="leaveplan-detail-title-container">
                      <h1 className="leaveplan-detail-title-name">
                        {capitalizeNameHelper(data?.employee?.name || '')}
                      </h1>
                      <h1>ID: {data?.employeeID}</h1>
                      <h1>
                        Position: {data?.employee?.position?.name.toUpperCase()}
                      </h1>
                      <h1>Crew: {data?.employee?.crew?.name.toUpperCase()}</h1>
                    </div>
                    <div className="leaveplan-detail-info-container">
                      <div className="leaveplan-detail-info-title">
                        <h1>Status :</h1>
                        <h1>Description :</h1>
                        <h1>From :</h1>
                        <h1>To :</h1>
                        <h1>File :</h1>
                      </div>
                      <div className="leaveplan-detail-info-data">
                        <h1>
                          {data?.isApproved === true ? (
                            <Badge
                              status="success"
                              text={'Approved'}
                              size="default"
                            />
                          ) : (
                            <Badge
                              status="warning"
                              text={'Booking'}
                              size="default"
                            />
                          )}
                        </h1>
                        <h1>{data?.leaveStatus?.name.toUpperCase()}</h1>
                        <h1>
                          {formatDateHelper(
                            data?.startDate.toString() || '',
                            'long'
                          )}
                        </h1>
                        <h1>
                          {formatDateHelper(
                            data?.endDate.toString() || '',
                            'long'
                          )}
                        </h1>
                        {data?.formCuti ? (
                          <Link onClick={handleOpenFileNewWindow} isExternal>
                            open file <ExternalLinkIcon mx="2px" />
                          </Link>
                        ) : (
                          '-'
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                {user?.role === 1 && data?.isApproved === false ? (
                  <Button
                    colorScheme="green"
                    mr={3}
                    onClick={handleApproveLeavePlan}
                  >
                    Approve
                  </Button>
                ) : null}
                <Button colorScheme="blue" mr={3} onClick={handleEdit}>
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => confirmDelete(data?.id || 0)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LeavePlanModal;
