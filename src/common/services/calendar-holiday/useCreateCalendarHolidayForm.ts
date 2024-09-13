import { useFormik } from 'formik';
import { CalendarHolidayRequest } from './types';

export const useCreateCalendarHolidayForm = (
  onSubmit: (values: CalendarHolidayRequest) => void
) => {
  const initialValues: CalendarHolidayRequest = {
    name: '',
    date: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
  });

  return formik;
};
