import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
// @ts-ignore
import { Button, ButtonStyles, ButtonTypes } from '../../../components/Button/index.tsx'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../Profile.module.scss'

export type EmailFormValuesType = {
  email: string;
  password: string
}

type EmailFormPropsType = {
  onSubmitEmail: (values: EmailFormValuesType) => void,
  userEmail: string,
  changeEmailSuccess: string,
  changeEmailError: string
}

const EmailForm: React.FC<EmailFormPropsType> = ({
  onSubmitEmail,
  userEmail,
  changeEmailSuccess,
  changeEmailError
}) => {
  const { t } = useTranslation()

  const initialValues = {
    email: `${userEmail}`,
    password: ''
  }

  const [editMode, setEditMode] = useState(false)

  const [values, setValues] = useState(initialValues)

  interface ErrorsType{
    email?: string,
    password?: string
  }

  const [errors, setErrors] = useState<ErrorsType>({

  })

  const passwordRequired = (value: string) => {
    if (value) return undefined
    return t('forms.validators.passwordRequired')
  }

  const validEmailRequired = (email: string) => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return null
    }
    if (email.trim() === '') {
      return t('forms.validators.emailRequired')
    }
    return t('forms.validators.emailInvalid')
  }

  const validate = {
    email: validEmailRequired,
    password: passwordRequired
  }

  useEffect(() => {
    if (changeEmailSuccess) {
      setEditMode(false)
      setValues(initialValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setValues({
      ...values,
      [name]: value
    })

    setEditMode(true)
  }

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    // @ts-ignore
    const error = validate[name](value)
    // @ts-ignore
    const { [name]: oldError, ...rest } = errors

    setErrors({
      ...rest,
      ...(error && {
        [name]: error
      })
    })
  }

  const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmitEmail(values)
  }

  return (
    <form onSubmit={handleSumbit} className={classes.Form}>
      <div className={classes.FieldContainer}>
        <div className={classes.FieldTitle}>{t('forms.titles.email')}</div>
        <div
          className={classNames(
            styles.formsControls,
            errors.email ? styles.error : ''
          )}
        >
          <input
            defaultValue={userEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={userEmail}
            name="email"
            required
          />
          {errors.email && (
            <div>
              {/* @ts-ignore */}
              <div className={styles.warning} tooltip={errors.email}>
                !
              </div>
            </div>
          )}
        </div>
      </div>
      {!editMode && changeEmailSuccess && (
        <div className={styles.formSummarySuccess}>{changeEmailSuccess}</div>
      )}
      {editMode && (
        <div className={classes.Form}>
          <div className={classes.FieldContainer}>
            <div className={classes.FieldTitle}>
              {t('forms.titles.passwordEnter')}
            </div>
            <div
              className={classNames(
                styles.formsControls,
                errors.password ? styles.error : ''
              )}
            >
              <input
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                required
              />
              {errors.password && (
                <div>
                  {/* @ts-ignore */}
                  <div className={styles.warning} tooltip={errors.password}>
                    !
                  </div>
                </div>
              )}
            </div>
          </div>
          {changeEmailError && (
            <div className={styles.formSummaryError}>{changeEmailError}</div>
          )}
          <Button
            text={t('forms.buttons.emailUpdate')}
            type={ButtonTypes.Submit}
            stylish={ButtonStyles.Primary}
          />
        </div>
      )}
    </form>
  )
}

export default EmailForm
