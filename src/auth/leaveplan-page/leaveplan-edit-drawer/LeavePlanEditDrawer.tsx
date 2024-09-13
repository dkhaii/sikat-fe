import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Form,
  Select,
  Col,
  Drawer,
  Space,
  Button,
  Upload,
  UploadFile,
} from 'antd';
import LoadingModal from '../../../components/common/loading-modal/LoadingModal';
import { useEditLeavePlan } from '../../../common/services/leave-plan/useEditLeavePlan';

type LeavePlanEditDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  leavePlanID: number;
  employeeID: string;
};

const LeavePlanEditDrawer = ({
  isOpen,
  onClose,
  leavePlanID,
  employeeID,
}: LeavePlanEditDrawerProps) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = React.useState(false);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const { mutate } = useEditLeavePlan(
    leavePlanID,
    employeeID,
    () => {
      form.resetFields();
      setFileList([]);
      onClose();
      setLoading(false);
    },
    (error) => {
      console.error('Error submitting leave plan:', error);
      setLoading(false);
    }
  );

  const onFinish = async (values: {
    startDate: string;
    endDate: string;
    leaveStatusID: number;
  }) => {
    setLoading(true);

    const formData = new FormData();
    // console.log('Form Values:', values);

    if (values.startDate) {
      formData.append('startDate', values.startDate);
    }

    if (values.endDate) {
      formData.append('endDate', values.endDate);
    }

    if (values.leaveStatusID) {
      formData.append('leaveStatusID', values.leaveStatusID.toString());
    }

    if (fileList.length > 0) {
      formData.append('formCuti', fileList[0].originFileObj as File);
    }

    // console.log('Form Data:', formData);

    mutate(formData);
  };

  const handleUploadChange = (info: { fileList: UploadFile[] }) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // Keep only the most recent file
    setFileList(newFileList);
  };

  return (
    <>
      <Drawer
        title={`Edit Leave Plan - [ id: ${leavePlanID} / badge: ${employeeID} ]`}
        width={480}
        onClose={onClose}
        open={isOpen}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={() => form.submit()}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Col>
            <Col span={20}>
              <Form.Item name="startDate" label="Start Date">
                <DatePicker format={'YYYY-MM-DD'} />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item name="endDate" label="End Date">
                <DatePicker format={'YYYY-MM-DD'} />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item name="leaveStatusID" label="Leave Status">
                <Select
                  options={[
                    { value: 1, label: 'Annual Leave' },
                    { value: 2, label: 'Out Standing Leave' },
                    { value: 3, label: 'Sick Leave' },
                    { value: 4, label: 'Business Trip' },
                    { value: 5, label: 'MCU' },
                    { value: 6, label: 'LWOP' },
                    { value: 7, label: 'LWP' },
                    { value: 8, label: 'Referal' },
                    { value: 9, label: 'SQR' },
                    { value: 10, label: 'Long Leave' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item name="formCuti" label="Form Cuti">
                <Upload
                  fileList={fileList}
                  beforeUpload={() => false} // Prevent auto upload
                  onChange={handleUploadChange}
                >
                  <Button icon={<UploadOutlined />}>Upload PDF</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Col>
        </Form>
      </Drawer>
      {isLoading ? (
        <LoadingModal isLoading={isLoading} onClose={() => {}} />
      ) : null}
    </>
  );
};

export default LeavePlanEditDrawer;
