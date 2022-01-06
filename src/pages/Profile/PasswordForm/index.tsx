import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import classNames from 'classnames'
import { FormikInput } from '../../../components/FormsControls'
// @ts-ignore
import { Button, ButtonStyles, ButtonTypes } from '../../../components/Button/index.tsx'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../Profile.module.scss'

export type PasswordFormValuesType = {
  current_password: string,
  password: string,
  password_confirmation: string
}

type PasswordFormPropsType = {
  onSubmit: (values: PasswordFormValuesType) => void,
  changePasswordSuccess: string,
  changePasswordError: string
}

const PasswordForm: React.FC<PasswordFormPropsType> = ({
  onSubmit,
  changePasswordError,
  changePasswordSuccess
}) => {
  const { t } = useTranslation()

  const [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setEditMode(!editMode)
  }

  const initialValues = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const validationsSchema = yup.object().shape({
    current_password: yup
      .string()
      .required(t('forms.validators.passwordCurrentRequired')),
    password: yup
      .string()
      .required(t('forms.validators.passwordNewRequired'))
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
    <div className={classes.Form}>
      <div
        className={classNames(
          classes.Link,
          classes.Arrow,
          editMode ? classes.Up : '',
          !editMode ? classes.Down : ''
        )}
        onClick={activateEditMode}
        onKeyPress={activateEditMode}
        role="link"
        tabIndex={0}
      >
        {t('forms.titles.changePassword')}
      </div>
      {editMode && (
        <Formik
          initialValues={initialValues}
          validateOnBlur
          onSubmit={(values, { resetForm }) => {
            onSubmit(values)
            resetForm()
          }}
          validationSchema={validationsSchema}
        >
          <Form className={classes.Form} data-testid="form">
            <div className={classes.FieldContainer}>
              <div className={classes.FieldTitle}>{t('forms.titles.passwordCurrentEnter')}</div>
              <FormikInput
                name="current_password"
                type="password"
                placeholder={t('forms.placeholders.passwordCurrent')}
                data-testid="current_password"
              />
            </div>
            <div className={classes.FieldContainer}>
              <div className={classes.FieldTitle}>{t('forms.titles.passwordNewEnter')}</div>
              <FormikInput
                name="password"
                type="password"
                placeholder={t('forms.placeholders.passwordNew')}
                data-testid="password"
              />
            </div>
            <div className={classes.FieldContainer}>
              <div className={classes.FieldTitle}>{t('forms.titles.passwordNewConfirm')}</div>
              <FormikInput
                name="password_confirmation"
                type="password"
                placeholder={t('forms.placeholders.passwordNew')}
                data-testid="password_confirmation"
              />
            </div>
            {changePasswordError && (
              <div className={styles.formSummaryError}>
                {changePasswordError}
              </div>
            )}
            {changePasswordSuccess && (
              <div className={styles.formSummarySuccess}>
                {changePasswordSuccess}
              </div>
            )}
            <Button
              text={t('forms.buttons.passwordUpdate')}
              type={ButtonTypes.Submit}
              stylish={ButtonStyles.Primary}
            />
          </Form>
        </Formik>
      )}
    </div>
  )
}

export default PasswordForm
