import { useFormik } from 'formik';
import { CreateLeavePlanRequest } from './types';
import React from 'react';
import { UploadChangeParam } from 'antd/es/upload';

export const useCreateLeavePlanForm = (
  onSubmit: (values: CreateLeavePlanRequest) => void
) => {
  const [file, setFile] = React.useState<File | null>(null);
  const initialValues: CreateLeavePlanRequest = {
    employeeID: '',
    startDate: '',
    endDate: '',
    leaveStatusID: '',
    formCuti: undefined as File | undefined,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      onSubmit({ ...values, formCuti: file! });
    },
  });

  // console.log(formik.values);

  const onFileChange = (info: UploadChangeParam) => {
    const file = info.file.originFileObj as File;
    setFile(file);
    formik.setFieldValue('formCuti', file);
  };

  return { formik, onFileChange };
};
