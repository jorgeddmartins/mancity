import { useContext, useMemo, useState } from 'react';
import { Formik, FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';
import cx from 'classnames';
import { parseDateString } from '@utils/dates';
import s from './FormCRMSignup.module.scss';
import Button, { ButtonVariants } from './Button';
import { PageContext } from './Page';
import FormInputText from './FormInputText';
import FormInputDate from './FormInputDate';
import FormInputCheckbox from './FormInputCheckbox';
import { ReactComponent as Logo } from '../assets/img/logo.svg';
import { ReactComponent as Bottomicons } from '../assets/img/bottomicons.svg';
import { sendEvent } from '@utils/analytics';
import classNames from 'classnames';

interface FormValues {
  email: string;
  dob: string;
  newsletter: boolean;
  formError?: string;
}

type FormCRMSignupProps = {
  show: boolean;
  onSignup: () => void;
};

const FormCRMSignup = ({ show, onSignup }: FormCRMSignupProps) => {
  const { copy } = useContext(PageContext);

  const submitCRM = async (
    setSubmitting: (isSubmitting: boolean) => void,
    values: FormValues,
    callback: () => void,
    setErrors: (formikErrors: FormikErrors<FormValues>) => void
  ) => {
    setErrors({ formError: copy('form.CRM.submission.error') });
    setSubmitting(false);
    return;

    const crmEventValues = { success: false };
    const response = await fetch('/api/SendToCRM', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emailAddress: values.email,
        dateOfBirth: values.dob,
        emailPermission: values.newsletter
      })
    });
    if (!response.ok && process.env.NODE_ENV === 'production') {
      setErrors({ formError: copy('form.CRM.submission.error') });
    } else {
      crmEventValues.success = true;
      callback();
    }
    sendEvent('crm_signup', crmEventValues);
    setSubmitting(false);
  };
  return (
    <section
      className={cx(s.wrap, {
        [s.show]: show
      })}
    >
      <div className={s.content}>
        <div className={s.logo}>
          <Logo />
        </div>
        <h1 dangerouslySetInnerHTML={{ __html: copy('form.title') }} />
        <h3>{copy('form.subtitle')}</h3>
        <Formik
          initialValues={{ email: '', dob: '', newsletter: false }}
          onSubmit={(values: FormValues, { setSubmitting, setErrors }) => {
            submitCRM(setSubmitting, values, onSignup, setErrors);
          }}
          validationSchema={Yup.object({
            dob: Yup.date()
              .transform(parseDateString)
              .required(copy('form.CRM.dob.error.required')),
            email: Yup.string()
              .email(copy('form.CRM.email.error'))
              .required(copy('form.CRM.email.error.required')),
            newsletter: Yup.boolean().oneOf(
              [true],
              copy('form.CRM.newsletter.error')
            )
          })}
        >
          {props => {
            const errors = [];
            Object.keys(props.errors).forEach(key => {
              if (props.errors[key]) {
                errors.push(props.errors[key]);
              }
            });
            const hasErrors = errors.length > 0 || !props.dirty;

            return (
              <form
                onSubmit={props.handleSubmit}
                className={classNames({
                  [s.formWithError]: props.errors.formError
                })}
              >
                <div className={s.inputField}>
                  <FormInputDate
                    name="dob"
                    label={copy('form.CRM.dob')}
                    error={props.touched.dob && props.errors.dob}
                    onBlur={props.handleBlur}
                  />
                </div>
                <div className={s.inputField}>
                  <FormInputText
                    type="email"
                    name="email"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    label={copy('form.CRM.email')}
                    autoComplete="off"
                    error={props.touched.email && props.errors.email}
                  />
                </div>
                <div className={s.checkToSubmit}>
                  <FormInputCheckbox
                    name="newsletter"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <p>{copy('form.submit.accept')}</p>
                </div>

                {props.errors.formError && (
                  <div className={s.formError}>
                    {copy('form.CRM.submission.error')}
                  </div>
                )}

                <Button
                  disabled={hasErrors}
                  variant={ButtonVariants.MIDNIGHTBLUE}
                  type="submit"
                >
                  {copy('form.CRM.CTA')}
                </Button>
              </form>
            );
          }}
        </Formik>
        <div className={s.bottomContent}>
          <p
            className={s.legalsText}
            dangerouslySetInnerHTML={{ __html: copy('form.legals') }}
          />
          <Bottomicons />
        </div>
      </div>
    </section>
  );
};

export default FormCRMSignup;
