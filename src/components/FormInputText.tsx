import { useState, ChangeEvent } from 'react';
import classNames from 'classnames';

import s from './FormInputText.module.scss';

interface FormInputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  error?: string;
}

const FormInputText = ({
  label,
  name,
  error,
  onChange,
  ...props
}: FormInputTextProps) => {
  const [isLabelUp, setIslabelUp] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value != '') {
      setIslabelUp(true);
    } else {
      setIslabelUp(false);
    }
    onChange(event);
  };

  return (
    <div
      className={classNames({
        [s.inputWrap]: true,
        [s.fieldError]: !!error
      })}
    >
      <input id={name} name={name} {...props} onChange={handleChange} />
      <label htmlFor={name} className={isLabelUp ? s.lableUp : ''}>
        {label}
      </label>
      {error && <span className={s.error_msg}>{error}</span>}
    </div>
  );
};

export default FormInputText;
