import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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

  const handleChange = (evt) => {
    const { name, value } = evt.target

    setValues({
      ...values,
      [name]: value
    })

    setEditMode(true)
  }

  const handleBlur = (evt) => {
    const { name, value } = evt.target

    const error = validate[name](value)

    const { [name]: oldError, ...rest } = errors

    setErrors({
      ...rest,
      ...(error && {
        [name]: error
      })
    })
  }

  return (
    <form onSubmit={onSubmitEmail} className={classes.Form}>
      <div className={classes.FieldContainer}>
        <div className={classes.FieldTitle}>Email:</div>
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
            <div className={classes.FieldTitle}>Enter your password: </div>
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
          <Button text="Update email" type="submit" stylish="Primary" />
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
