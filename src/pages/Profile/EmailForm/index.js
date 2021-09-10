import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Button } from '../../../components/Button'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../Profile.module.scss'
import { validate } from '../../../components/validators'

const EmailForm = ({
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

  const [errors, setErrors] = useState({

  })

  useEffect(() => {
    if (changeEmailSuccess) {
      setEditMode(false)
      setValues(initialValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail])

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues({
      ...values,
      [name]: value
    })

    setEditMode(true)
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    const error = validate[name](value)
    const { [name]: oldError, ...rest } = errors

    setErrors({
      ...rest,
      ...(error && {
        [name]: error
      })
    })
  }

  const handleSumbit = (event) => {
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
            <div className={classes.FieldTitle}>{t('forms.titles.passwordEnter')}</div>
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
          <Button text={t('forms.buttons.emailUpdate')} type="submit" stylish="Primary" />
        </div>
      )}
    </form>
  )
}

export default EmailForm

EmailForm.propTypes = {
  onSubmitEmail: PropTypes.func,
  userEmail: PropTypes.string,
  changeEmailSuccess: PropTypes.string,
  changeEmailError: PropTypes.string
}

EmailForm.defaultProps = {
  onSubmitEmail: PropTypes.func,
  userEmail: PropTypes.string,
  changeEmailSuccess: '',
  changeEmailError: ''
}
