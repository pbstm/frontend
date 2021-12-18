import React from 'react'
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { FormikInput } from '../../../components/FormsControls'
import { Button } from '../../../components/Button'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../Register.module.scss'

export type RegisterFormValuesType = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
};

type RegisterFormPropsType = {
  registerError: string,
  onSubmit: (values: RegisterFormValuesType) => void;
};

const RegisterForm: React.FC<RegisterFormPropsType> = ({ onSubmit, registerError }) => {
  const { t } = useTranslation()

  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  const validationsSchema = yup.object().shape({
    name: yup
      .string()
      .required(t('forms.validators.nameRequired'))
      .matches(
        /^[\s\S]{3,30}$/,
        'Name must be at least 3 and no more than 30 characters'
      ),
    email: yup
      .string()
      .required(t('forms.validators.emailRequired'))
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        t('forms.validators.emailInvalid')
      ),
    password: yup
      .string()
      .required(t('forms.validators.passwordRequired'))
      .matches(
        /^[\s\S]{6,30}$/,
        t('forms.validators.passwordLength')
      ),
    password_confirmation: yup
      .string()
      .required(t('forms.validators.passwordConfirmRequired'))
      .oneOf([yup.ref('password'), null], t('forms.validators.passwordUnequal'))
  })
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={(values) => {
          onSubmit(values)
        }}
        validationSchema={validationsSchema}
      >
        <Form className={classes.Form} data-testid="form">
          <div className={classes.FieldContainer}>
            <div className={classes.FieldTitle}>
              {t('forms.titles.nameEnter')}
            </div>
            <FormikInput
              name="name"
              placeholder={t('forms.placeholders.name')}
              data-testid="name"
            />
          </div>
          <div className={classes.FieldContainer}>
            <div className={classes.FieldTitle}>
              {t('forms.titles.emailEnter')}
            </div>
            <FormikInput
              name="email"
              type="email"
              placeholder={t('forms.placeholders.email')}
              data-testid="email"
            />
          </div>
          <div className={classes.FieldContainer}>
            <div className={classes.FieldTitle}>
              {t('forms.titles.passwordEnter')}
            </div>
            <FormikInput
              name="password"
              type="password"
              placeholder={t('forms.placeholders.password')}
              data-testid="password"
            />
          </div>
          <div className={classes.FieldContainer}>
            <div className={classes.FieldTitle}>
              {t('forms.titles.passwordConfirm')}
            </div>
            <FormikInput
              name="password_confirmation"
              type="password"
              placeholder={t('forms.placeholders.password')}
              data-testid="password_confirmation"
            />
          </div>
          {registerError && (
            <div className={styles.formSummaryError}>{registerError}</div>
          )}

          <Button
            text={t('forms.buttons.singUp')}
            type="submit"
            stylish="Primary"
          />
        </Form>
      </Formik>
    </div>
  )
}

export default RegisterForm
