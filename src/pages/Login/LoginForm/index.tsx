import React from 'react'
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { FormikInput, FormikCheckbox } from '../../../components/FormsControls'
// @ts-ignore
import { Button, ButtonStyles, ButtonTypes } from '../../../components/Button/index.tsx'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../../Register/Register.module.scss'

export type LoginFormValuesType = {
  email: string;
  password: string;
  type: boolean
};

type LoginFormPropsType = {
  loginError: string,
  onSubmit: (values: LoginFormValuesType) => void;
};

const LoginForm: React.FC<LoginFormPropsType> = ({ onSubmit, loginError }) => {
  const { t } = useTranslation()

  const initialValues = {
    email: '',
    password: '',
    type: false
  }

  const validationsSchema = yup.object().shape({
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
      )
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
              {t('forms.titles.loginCheckbox')}
            </div>
            <FormikCheckbox name="type" data-testid="checkbox" />
          </div>
          {loginError && (
            <div className={styles.formSummaryError}>{loginError}</div>
          )}

          <Button
            text={t('forms.buttons.singIn')}
            type={ButtonTypes.Submit}
            stylish={ButtonStyles.Primary}
          />
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm
