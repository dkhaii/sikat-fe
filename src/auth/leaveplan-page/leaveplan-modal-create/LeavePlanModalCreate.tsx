import { UploadOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Form,
  Input,
  Select,
  Col,
  Drawer,
  Space,
  Button,
  Upload,
  UploadFile,
} from 'antd';
import React from 'react';
import { useCreateLeavePlan } from '../../../common/services/leave-plan/useCreateLeavePlan';
import LoadingModal from '../../../components/common/loading-modal/LoadingModal';

type RosterModalCreateProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LeavePlanModalCreate = ({ isOpen, onClose }: RosterModalCreateProps) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = React.useState(false);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const { mutate } = useCreateLeavePlan(
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
    employeeID: string;
    startDate: string;
    endDate: string;
    leaveStatusID: number;
  }) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('employeeID', values.employeeID);
    formData.append('startDate', values.startDate);
    formData.append('endDate', values.endDate);
    formData.append('leaveStatusID', values.leaveStatusID.toString());

    if (fileList.length > 0) {
      formData.append('formCuti', fileList[0].originFileObj as File);
    }

    // console.log(formData);

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
        title="Book Leave Plan"
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
              <Form.Item
                name="employeeID"
                label="Badge ID"
                rules={[{ required: true, message: 'Please enter badge id' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: 'Please enter start date' }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: 'Please enter end date' }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="leaveStatusID"
                label="Leave Status"
                rules={[
                  { required: true, message: 'Please select leave status' },
                ]}
              >
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

export default LeavePlanModalCreate;
