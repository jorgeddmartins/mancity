import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { useField, useFormikContext } from 'formik';
import { useRef } from 'react';
import classNames from 'classnames';

import s from './FormInputDate.module.scss';

type Props<TInputDate, TDate> = {
  name: string;
  error: string;
  onBlur: (e: FocusEvent) => void;
} & Omit<DatePickerProps<TInputDate | TDate>, 'onChange' | 'value'>;

const FormInputDate = <TInputDate, TDate = TInputDate>(
  props: Props<TInputDate, TDate>
) => {
  const { name, error, ...restProps } = props;
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const fieldInputElem = useRef<HTMLInputElement>();

  return (
    <div
      className={classNames({
        [s.inputWrap]: true,
        [s.fieldError]: meta.touched && meta.error
      })}
    >
      <span className={s.calendar}></span>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...restProps}
          value={field.value !== '' ? field.value : null}
          onChange={val => {
            setFieldValue(name, new Date(val));
          }}
          onClose={() => {
            setFieldTouched(name, true, true);
            fieldInputElem.current.blur();
          }}
          inputRef={fieldInputElem}
        />
      </LocalizationProvider>
      {meta.touched && meta.error && (
        <span className={s.error_msg}>{error}</span>
      )}
    </div>
  );
};

export default FormInputDate;
