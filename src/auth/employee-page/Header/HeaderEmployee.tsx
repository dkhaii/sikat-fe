// import React from 'react';
import './HeaderEmployee.css';
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
} from '@chakra-ui/react';
import { AddIcon, Search2Icon } from '@chakra-ui/icons';
import { useFormik } from 'formik';

type SearchEmployeeFormInitialValues = {
  id?: string;
  name?: string;
};

type HeaderEmployeeProps = {
  sendInputValues: (inputValues: string) => void;
  openAddEmployeeDrawer: () => void;
};

const HeaderEmployee = ({
  sendInputValues,
  openAddEmployeeDrawer,
}: HeaderEmployeeProps) => {
  const formInitialValues: SearchEmployeeFormInitialValues = {
    name: '',
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit: (inputValues) => {
      console.log(inputValues);
      if (!inputValues.name) {
        sendInputValues('');
      }
      sendInputValues(inputValues.name || '');
    },
  });

  return (
    <div className="headeremployee-container">
      <div className="headeremployee-title-container">
        <h1>Employee</h1>
      </div>
      <div className="headeremployee-action-container">
        <div className="headeremployee-search-container">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftAddon>
                  <Search2Icon />
                </InputLeftAddon>
                <Input
                  type="tel"
                  placeholder="Search"
                  name="name"
                  onChange={formik.handleChange}
                />
              </InputGroup>
            </Stack>
          </form>
        </div>
        <div className="headeremployee-button-container">
          <Button
            leftIcon={<AddIcon />}
            variant="outline"
            fontFamily="PlusJakartaSansExtraLight"
            onClick={openAddEmployeeDrawer}
          >
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderEmployee;
