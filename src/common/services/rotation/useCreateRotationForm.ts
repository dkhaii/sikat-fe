import { useFormik } from 'formik';
import { CreateRotationRequest } from './types';

export const useCreateRotationForm = (
  onSubmit: (values: CreateRotationRequest) => void
) => {
  const initialValues: CreateRotationRequest = {
    employeeID: '',
    effectiveDate: '',
    // endDate: '',
    positionID: 0,
    crewID: 0,
    pitID: 0,
    baseID: 0,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
  });

  return formik;
};
