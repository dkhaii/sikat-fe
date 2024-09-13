import { useFormik } from 'formik';
import { UserAPP } from './types';

export const useCreateUserAppForm = (onSubmit: (values: UserAPP) => void) => {
  const initialValues: UserAPP = {
    id: '',
    password: '',
    name: '',
    roleID: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
  });

  return formik;
};
