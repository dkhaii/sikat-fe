import { useFormik } from 'formik';
import { EditMcuReminderDto } from './types';

export const useEditMcuReminderForm = (
  onSubmit: (values: EditMcuReminderDto) => void
) => {
  const initialValues: EditMcuReminderDto = {
    date: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
  });

  return formik;
};
