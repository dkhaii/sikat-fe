import React from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
} from 'antd';
import { useCreateCalendarHoliday } from '../../common/services/calendar-holiday/useCreateCalendarHoliday';
import { useCreateCalendarHolidayForm } from '../../common/services/calendar-holiday/useCreateCalendarHolidayForm';
import LoadingSpinner from '../../components/common/loading-spinner/LoadingSpinner';
import { useCreateUserApp } from '../../common/services/user/useCreateUserApp';
import { useCreateUserAppForm } from '../../common/services/user/useCreateUserAppForm';
import { useCreateMcuReminder } from '../../common/services/mcu-reminder/useCreateMcuReminder';
import { useCreateMcuReminderForm } from '../../common/services/mcu-reminder/useCreateMcuReminderForm';
import { useGetMcuReminder } from '../../common/services/mcu-reminder/useGetMcuReminder';
import McuTableAuth from './mcu-table-auth/McuTableAuth';
import { useGetCalendarHolidayPerYear } from '../../common/services/calendar-holiday/useGetCalendarHolidaysPerYear.';
import CalendarHolidayTable from './calendar-holiday-table/CalendarHolidayTable';

const SettingsPage: React.FC = () => {
  const [isLoadingCreateHoiday, setLoadingCreateHoiday] = React.useState(false);
  const [isLoadingCreateUserApp, setLoadingCreateUserApp] =
    React.useState(false);
  const [isLoadingCreateMcuReminder, setLoadingCreateMcuReminder] =
    React.useState(false);
  const [isShowMcuTable, setShowMcuTable] = React.useState(false);
  const [isShowCalendarTable, setShowCalendarTable] = React.useState(false);
  const { data: mcuReminderData } = useGetMcuReminder();
  const { mutate: mutateCreateCalendarHoliday } = useCreateCalendarHoliday(
    () => {
      setLoadingCreateHoiday(false),
        message.success('Calendar Holiday created successfully');
    },
    (error) => {
      setLoadingCreateHoiday(false);
      message.error(`Error: ${error}`);
    }
  );
  const { mutate: mutateCreateUserApp } = useCreateUserApp(
    () => {
      setLoadingCreateUserApp(false);
      message.success('New User created successfully');
    },
    (error) => {
      setLoadingCreateUserApp(false);
      message.error(`Error: ${error}`);
    }
  );
  const { mutate: mutateCreateMcuReminder } = useCreateMcuReminder(
    () => {
      setLoadingCreateMcuReminder(false);
      message.success('Mcu Reminder created');
    },
    (error) => {
      setLoadingCreateMcuReminder(false);
      message.error(`Error: ${error}`);
    }
  );
  const { data: calendarHolidayData } = useGetCalendarHolidayPerYear();

  const formikCalendarHoliday = useCreateCalendarHolidayForm((values) => {
    setLoadingCreateHoiday(false);
    mutateCreateCalendarHoliday(values);
  });

  const formikUserApp = useCreateUserAppForm((values) => {
    setLoadingCreateUserApp(false);
    mutateCreateUserApp(values);
  });

  const formikMcuReminder = useCreateMcuReminderForm((values) => {
    setLoadingCreateUserApp(false);
    mutateCreateMcuReminder(values);
  });

  const handleShowMcuTable = () => {
    setShowMcuTable(true);
  };

  const handleShowCalendarHoliday = () => {
    setShowCalendarTable(true);
  };

  const sortedCalendarHolidays = (calendarHolidayData || []).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const sortedMCUDatas = (mcuReminderData || []).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <>
      <Col>
        <Row>
          <Col span={8}>
            <Card
              title="Create Holiday"
              bordered={false}
              style={{ width: 500 }}
            >
              {isLoadingCreateHoiday ? (
                <LoadingSpinner />
              ) : (
                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  style={{ maxWidth: 600 }}
                >
                  <Form.Item label="Name">
                    <Input
                      onChange={(e) =>
                        formikCalendarHoliday.setFieldValue(
                          'name',
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Date">
                    <DatePicker
                      onChange={(date, dateString) =>
                        formikCalendarHoliday.setFieldValue('date', dateString)
                      }
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button onClick={formikCalendarHoliday.submitForm}>
                      Create
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button onClick={handleShowCalendarHoliday}>
                      View Calendar
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Card>
          </Col>
          {isShowCalendarTable ? (
            <CalendarHolidayTable
              label={'Calendar Holiday'}
              calendarHoliday={sortedCalendarHolidays}
            />
          ) : null}
        </Row>
        <Col span={8}>
          <Card title="Create Account" bordered={false} style={{ width: 500 }}>
            {isLoadingCreateUserApp ? (
              <LoadingSpinner />
            ) : (
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
              >
                <Form.Item label="id">
                  <Input
                    onChange={(e) =>
                      formikUserApp.setFieldValue('id', e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item label="password">
                  <Input
                    onChange={(e) =>
                      formikUserApp.setFieldValue('password', e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item label="name">
                  <Input
                    onChange={(e) =>
                      formikUserApp.setFieldValue('name', e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item label="role">
                  <Select
                    onChange={(value) =>
                      formikUserApp.setFieldValue('roleID', value)
                    }
                    options={[
                      { value: 1, label: 'SUPT.' },
                      { value: 2, label: 'SUPV.' },
                    ]}
                  />
                </Form.Item>

                <Form.Item>
                  <Button onClick={formikUserApp.submitForm}>Create</Button>
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>
        <Row>
          <Col span={8}>
            <Card
              title="Add MCU Reminder"
              bordered={false}
              style={{ width: 500 }}
            >
              {isLoadingCreateMcuReminder ? (
                <LoadingSpinner />
              ) : (
                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  style={{ maxWidth: 600 }}
                >
                  <Form.Item label="Badge">
                    <Input
                      onChange={(e) =>
                        formikMcuReminder.setFieldValue('empID', e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Date">
                    <DatePicker
                      onChange={(date, dateString) =>
                        formikMcuReminder.setFieldValue('date', dateString)
                      }
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button onClick={formikMcuReminder.submitForm}>
                      Create
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button onClick={handleShowMcuTable}>View MCU</Button>
                  </Form.Item>
                </Form>
              )}
            </Card>
          </Col>
          {isShowMcuTable ? (
            <McuTableAuth label="MCU Datas" mcuReminder={sortedMCUDatas} />
          ) : null}
        </Row>
      </Col>
    </>
  );
};

export default SettingsPage;
