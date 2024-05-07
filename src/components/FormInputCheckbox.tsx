import s from './FormInputCheckbox.module.scss';

interface FormInputCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  children?: string;
}

const FormInputCheckbox = ({
  children,
  name,
  onChange,
  ...props
}: FormInputCheckboxProps) => {
  const localProps = Object.assign({}, props, { type: 'checkbox' });
  return (
    <label className={s.wrap}>
      <input type="checkbox" name={name} {...localProps} onChange={onChange} />
      <span className={s.checkMark}></span>
      {children}
    </label>
  );
};

export default FormInputCheckbox;
