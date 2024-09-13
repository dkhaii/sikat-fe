import React from 'react';
import {
  Button,
  Col,
  DatePicker,
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
import { Employee } from '../../../common/services/employee/types';
import { formatDateHelper } from '../../../common/services/helper';
import { useEditEmployee } from '../../../common/services/employee/useEditEmployee';
import { UploadOutlined } from '@ant-design/icons';
import LoadingModal from '../../../components/common/loading-modal/LoadingModal';

type EmployeeAddDrawerV2Props = {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
};

const EmployeeEditDrawer = ({
  isOpen,
  onClose,
  employee,
}: EmployeeAddDrawerV2Props) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = React.useState(false);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const { mutate } = useEditEmployee(
    employee.id,
    () => {
      form.resetFields();
      setFileList([]);
      onClose();
      setLoading(false);
      message.success('Success edit employee');
    },
    (error) => {
      console.error('Error editing employee: ', error);
      setLoading(false);
    }
  );

  const onFinish = async (values: {
    name: string;
    dateOfBirth: string;
    dateOfHire: string;
    positionID: string;
    crewID: string;
    pitID: string;
    baseID: string;
  }) => {
    setLoading(true);

    const formData = new FormData();
    // console.log('Form Values: ', values);

    if (values.name) {
      formData.append('nama', values.name);
    }

    if (values.dateOfBirth) {
      formData.append('dateOfBirth', values.dateOfBirth);
    }

    if (values.dateOfHire) {
      formData.append('dateOfHire', values.dateOfHire);
    }

    if (values.positionID) {
      formData.append('positionID', values.positionID);
    }

    if (values.crewID) {
      formData.append('crewID', values.crewID);
    }

    if (values.pitID) {
      formData.append('pitID', values.pitID);
    }

    if (values.baseID) {
      formData.append('baseID', values.baseID);
    }

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
        title={`Edit Employee - [ badge: ${employee.id} ]`}
        width={720}
        onClose={onClose}
        open={isOpen}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => form.submit()} type="primary">
              Save
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="id" label="Badge Number">
                <Input name="id" placeholder={employee.id} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="Name">
                <Input name="name" placeholder={employee.name} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="positionID" label="Position">
                <Select
                  options={[
                    {
                      value: 1,
                      label: 'Asst. Mgr. MO - Mine Control Dispatch',
                    },
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
            </Col>
            <Col span={12}>
              <Form.Item name="crewID" label="Crew">
                <Select
                  options={[
                    { value: 1, label: 'Alpha' },
                    { value: 2, label: 'Bravo' },
                    { value: 3, label: 'Charlie' },
                    { value: 4, label: 'Steady Day' },
                  ]}
                  placeholder={employee.crew?.name}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="pitID" label="Pit">
                <Select
                  options={[
                    { value: 1, label: 'Bintang' },
                    { value: 2, label: 'Hatari' },
                    { value: 3, label: 'Jupiter' },
                    { value: '4', label: 'M2' },
                  ]}
                  placeholder={employee.pit?.name}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="baseID" label="Base">
                <Select
                  options={[
                    { value: 1, label: 'M2' },
                    { value: 2, label: 'OSCAR BASE' },
                  ]}
                  placeholder={employee.base?.name}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="dateOfBirth" label="Date Of Birth">
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder={formatDateHelper(
                    employee.dateOfBirth.toString(),
                    'medium'
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dateOfHire" label="Date Of Hire">
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder={formatDateHelper(
                    employee.dateOfHire.toString(),
                    'medium'
                  )}
                />
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
                  <Button icon={<UploadOutlined />}>Upload IMG</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      {isLoading ? (
        <LoadingModal isLoading={isLoading} onClose={() => {}} />
      ) : null}
    </>
  );
};

export default EmployeeEditDrawer;
