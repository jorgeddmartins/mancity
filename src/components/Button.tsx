import cx from 'classnames';
import s from './Button.module.scss';

export enum ButtonVariants {
  DISABLED = 'disabled',
  MIDNIGHTBLUE = 'midnightBlue',
  BORDER_MIDNIGHTBLUE = 'border_midnightblue'
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariants;
}

const Button = ({
  variant = ButtonVariants.MIDNIGHTBLUE,
  className,
  children,
  ...props
}: ButtonProps) => {
  const buttonStyles = cx(
    {
      [s.button]: true,
      [s.disabled]: variant === ButtonVariants.DISABLED,
      [s.borderMidnightblue]: variant === ButtonVariants.BORDER_MIDNIGHTBLUE
    },
    className
  );
  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
