import React from 'react';
import { DatePicker, Form, Input, message, Modal } from 'antd';
import { useCreateCalendarHoliday } from '../../../common/services/calendar-holiday/useCreateCalendarHoliday';
import { useCreateCalendarHolidayForm } from '../../../common/services/calendar-holiday/useCreateCalendarHolidayForm';
import LoadingSpinner from '../../../components/common/loading-spinner/LoadingSpinner';
import { useAuth } from '../../../common/services/Auth/AuthContext';

type AddEventCalendarHolidayModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddEventCalendarModal = ({
  isOpen,
  onClose,
}: AddEventCalendarHolidayModalProps) => {
  const { user } = useAuth();
  const [isLoadingCreateHoiday, setLoadingCreateHoiday] = React.useState(false);
  const { mutate } = useCreateCalendarHoliday(
    () => {
      setLoadingCreateHoiday(false),
        message.success('Calendar Holiday created successfully');
    },
    (error) => {
      setLoadingCreateHoiday(false);
      message.error(`Error: ${error}`);
    }
  );

  const formik = useCreateCalendarHolidayForm((values) => {
    setLoadingCreateHoiday(false);
    mutate(values);
  });

  return (
    <>
      <Modal
        title="Add Event to Calendar"
        open={isOpen}
        onOk={formik.submitForm}
        onCancel={onClose}
      >
        {isLoadingCreateHoiday ? (
          <LoadingSpinner />
        ) : (
          <>
            {user?.role === 1 ? (
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
              >
                <Form.Item label="Name">
                  <Input
                    onChange={(e) =>
                      formik.setFieldValue('name', e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item label="Date">
                  <DatePicker
                    onChange={(date, dateString) =>
                      formik.setFieldValue('date', dateString)
                    }
                  />
                </Form.Item>
              </Form>
            ) : null}
          </>
        )}
      </Modal>
    </>
  );
};

export default AddEventCalendarModal;
