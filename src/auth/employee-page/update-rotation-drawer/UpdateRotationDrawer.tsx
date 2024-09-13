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
import {
  // formatDateHelper,
  formatDateNormalHelper,
} from '../../../common/services/helper';
import LoadingModal from '../../../components/common/loading-modal/LoadingModal';
import { Employee } from '../../../common/services/employee/types';
import { useCreateRotationForm } from '../../../common/services/rotation/useCreateRotationForm';
import { useGetRotationByID } from '../../../common/services/rotation/useGetRotationByID';
import { useUpdateRotation } from '../../../common/services/rotation/useUpdateRotation';

type RotationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
};

const UpdateRotationDrawer = ({
  isOpen,
  onClose,
  employee,
}: RotationDrawerProps) => {
  const [isLoading, setLoading] = React.useState(false);
  const { data } = useGetRotationByID(employee.id);
  const { mutate } = useUpdateRotation(
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
        <Col style={{ marginBottom: '2rem' }}>
          <p>Existing Rotation Data: </p>
          <p>Position - [ {data?.position?.name.toUpperCase()} ]</p>
          <p>Crew - [ {data?.crew?.name.toUpperCase()} ]</p>
          <p>Pit - [ {data?.pit?.name.toUpperCase()} ]</p>
          <p>Base - [ {data?.base?.name.toUpperCase()} ]</p>
          <p>
            Effective Date - [
            {data?.effectiveDate &&
              formatDateNormalHelper(data?.effectiveDate?.toString(), 'long')}
            ]
          </p>
          <p>
            End Date - [
            {data?.endDate &&
              formatDateNormalHelper(data?.endDate?.toString(), 'long')}
            ]
          </p>
        </Col>
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
              />
            </Form.Item>
            <Form.Item name="baseID" label="Base">
              <Select
                onChange={(value) => formik.setFieldValue('baseID', value)}
                options={[
                  { value: 1, label: 'M2' },
                  { value: 2, label: 'OSCAR BASE' },
                ]}
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

export default UpdateRotationDrawer;
