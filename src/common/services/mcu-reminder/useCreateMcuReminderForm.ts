import { useFormik } from 'formik';
import { McuReminderDto } from './types';

export const useCreateMcuReminderForm = (
  onSubmit: (values: McuReminderDto) => void
) => {
  const initialValues: McuReminderDto = {
    empID: '',
    date: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
  });

  return formik;
};
