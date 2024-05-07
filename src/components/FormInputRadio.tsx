interface FormInputRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
}

const FormInputRadio = ({ label, name, onChange, ...props }) => {
  const localProps = Object.assign({}, props, { type: 'radio' });

  return (
    <div>
      <input type="" name={name} {...localProps} onChange={onChange} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default FormInputRadio;
