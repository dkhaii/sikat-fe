import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Upload,
  UploadFile,
} from 'antd';
import { useAddEmployee } from '../../../common/services/employee/useAddEmployee';
import { UploadOutlined } from '@ant-design/icons';

type EmployeeAddDrawerV2Props = {
  isOpen: boolean;
  onClose: () => void;
};

const EmployeeAddDrawerV2 = ({ isOpen, onClose }: EmployeeAddDrawerV2Props) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const { mutate } = useAddEmployee(
    () => {
      form.resetFields();
      setFileList([]);
      onClose();
      message.success('Success add new employee');
    },
    () => {
      message.error('Failed add new employee');
    }
  );

  const onFinish = async (values: {
    id: string;
    name: string;
    dateOfBirth: string;
    dateOfHire: string;
    positionID: string;
    crewID?: string;
    pitID?: string;
    baseID?: string;
    effectiveDate: string; // Added effectiveDate field
  }) => {
    const formData = new FormData();
    formData.append('id', values.id);
    formData.append('name', values.name);
    formData.append('dateOfBirth', values.dateOfBirth);
    formData.append('dateOfHire', values.dateOfHire);
    formData.append('positionID', values.positionID);

    if (values.crewID) {
      formData.append('crewID', values.crewID);
    }

    if (values.pitID) {
      formData.append('pitID', values.pitID);
    }

    if (values.baseID) {
      formData.append('baseID', values.baseID);
    }

    formData.append('effectiveDate', values.effectiveDate); // Add effectiveDate to FormData

    if (fileList.length > 0) {
      formData.append('profilePicture', fileList[0].originFileObj as File);
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
        title="Add New Employee"
        width={720}
        onClose={onClose}
        open={isOpen}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => form.submit()} type="primary">
              Add New
            </Button>
          </Space>
        }
        style={{
          paddingBottom: 80,
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="id"
                label="Badge Number"
                rules={[
                  { required: true, message: 'Please enter Badge Number' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter Name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="positionID"
                label="Position"
                rules={[
                  { required: true, message: 'Please select a Position' },
                ]}
              >
                <Select
                  options={[
                    {
                      value: '1',
                      label: 'Asst. Mgr. MO - Mine Control Dispatch',
                    },
                    { value: '2', label: 'Senior Dispatch Engineer' },
                    { value: '3', label: 'Senior Mining Engineer' },
                    { value: '4', label: 'Specialist Dispatch' },
                    { value: '5', label: 'Supervisor' },
                    { value: '6', label: 'Triner' },
                    { value: '7', label: 'GDP' },
                    { value: '8', label: 'Dispatcher' },
                    { value: '9', label: 'Assistant Dispatch' },
                    { value: '10', label: 'Operator Magang' },
                    { value: '11', label: 'Superintendent' },
                    { value: '12', label: 'Senior Specialist Dispatch' },
                    { value: '13', label: 'Dispatch Engineer' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="crewID" label="Crew">
                <Select
                  options={[
                    { value: '1', label: 'Alpha' },
                    { value: '2', label: 'Bravo' },
                    { value: '3', label: 'Charlie' },
                    { value: '4', label: 'Steady Day' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="pitID" label="Pit">
                <Select
                  options={[
                    { value: '1', label: 'Bintang' },
                    { value: '2', label: 'Hatari' },
                    { value: '3', label: 'Jupiter' },
                    { value: '4', label: 'M2' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="baseID" label="Base">
                <Select
                  options={[
                    { value: '1', label: 'M2' },
                    { value: '2', label: 'OSCAR BASE' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dateOfBirth"
                label="Date Of Birth"
                rules={[{ required: true, message: 'Please choose the date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateOfHire"
                label="Date Of Hire"
                rules={[{ required: true, message: 'Please choose the date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="profilePicture" label="Profile Picture">
                <Upload
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false} // Prevent auto upload
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Divider>Rotation</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="effectiveDate"
                label="Effective Date"
                rules={[{ required: true, message: 'Please choose the date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EmployeeAddDrawerV2;
