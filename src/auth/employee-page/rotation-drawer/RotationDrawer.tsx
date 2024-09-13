import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  message,
  Select,
  Space,
} from 'antd';
import { formatDateHelper } from '../../../common/services/helper';
import LoadingModal from '../../../components/common/loading-modal/LoadingModal';
import { Employee } from '../../../common/services/employee/types';
import { useCreateRotation } from '../../../common/services/rotation/useCreateRotation';
import { useCreateRotationForm } from '../../../common/services/rotation/useCreateRotationForm';

type RotationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
};

const RotationDrawer = ({ isOpen, onClose, employee }: RotationDrawerProps) => {
  const [isLoading, setLoading] = React.useState(false);
  const { mutate } = useCreateRotation(
    employee.id,
    () => {
      setLoading(false);
      message.success('Rotation created successfully');
      onClose();
    },
    (error) => {
      setLoading(false);
      message.error(`Error: ${error}`);
    }
  );

  const formik = useCreateRotationForm((values) => {
    setLoading(true);
    mutate(values);
  });

  return (
    <>
      <Drawer
        title={`Set Rotation - [ badge: ${employee.id} ]`}
        width={480}
        onClose={onClose}
        open={isOpen}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={formik.submitForm} type="primary">
              Save
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Col span={20}>
            <Form.Item name="positionID" label="Position">
              <Select
                onChange={(value) => formik.setFieldValue('positionID', value)}
                options={[
                  { value: 1, label: 'Asst. Mgr. MO - Mine Control Dispatch' },
                  { value: 2, label: 'Senior Dispatch Engineer' },
                  { value: 3, label: 'Senior Mining Engineer' },
                  { value: 4, label: 'Specialist Dispatch' },
                  { value: 5, label: 'Supervisor' },
                  { value: 6, label: 'Trainer' },
                  { value: 7, label: 'GDP' },
                  { value: 8, label: 'Dispatcher' },
                  { value: 9, label: 'Assistant Dispatch' },
                  { value: 10, label: 'Operator Magang' },
                  { value: 11, label: 'Superintendent' },
                  { value: 12, label: 'Senior Specialist Dispatch' },
                  { value: 13, label: 'Dispatch Engineer' },
                ]}
                placeholder={employee.position.name}
              />
            </Form.Item>
            <Form.Item name="crewID" label="Crew">
              <Select
                onChange={(value) => formik.setFieldValue('crewID', value)}
                options={[
                  { value: 1, label: 'Alpha' },
                  { value: 2, label: 'Bravo' },
                  { value: 3, label: 'Charlie' },
                  { value: 4, label: 'Steady Day' },
                ]}
                placeholder={employee.crew?.name}
              />
            </Form.Item>
            <Form.Item name="pitID" label="Pit">
              <Select
                onChange={(value) => formik.setFieldValue('pitID', value)}
                options={[
                  { value: 1, label: 'Bintang' },
                  { value: 2, label: 'Hatari' },
                  { value: 3, label: 'Jupiter' },
                  { value: '4', label: 'M2' },
                ]}
                placeholder={employee.pit?.name}
              />
            </Form.Item>
            <Form.Item name="baseID" label="Base">
              <Select
                onChange={(value) => formik.setFieldValue('baseID', value)}
                options={[
                  { value: 1, label: 'M2' },
                  { value: 2, label: 'OSCAR BASE' },
                ]}
                placeholder={employee.base?.name}
              />
            </Form.Item>
            <Form.Item
              name="effectiveDate"
              label="Effective Date"
              rules={[{ required: true, message: 'Please enter Name' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                onChange={(date, dateString) =>
                  formik.setFieldValue('effectiveDate', dateString)
                }
                placeholder={formatDateHelper(
                  employee.dateOfBirth.toString(),
                  'medium'
                )}
              />
            </Form.Item>
          </Col>
        </Form>
      </Drawer>
      {isLoading ? (
        <LoadingModal isLoading={isLoading} onClose={() => {}} />
      ) : null}
    </>
  );
};

export default RotationDrawer;
