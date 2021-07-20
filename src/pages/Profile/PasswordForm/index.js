import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import classNames from 'classnames'
import { FormikInput } from '../../../components/FormsControls'
import { Button } from '../../../components/Button'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../Profile.module.scss'

const PasswordForm = ({
  onSubmit,
  changePasswordError,
  changePasswordSuccess
}) => {
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
    current_password: yup.string().required('Field is required'),
    password: yup
      .string()
      .required('Field is required')
      .matches(
        /^[\s\S]{6,30}$/,
        'Password must be at least 6 and no more than 30 characters'
      ),
    password_confirmation: yup
      .string()
      .required('Field is required')
      .oneOf([yup.ref('password'), null], 'Passwords must be equal')
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
        Change password
      </div>
      {editMode && (
        <Formik
          initialValues={initialValues}
          validateOnBlur
          onSubmit={onSubmit}
          validationSchema={validationsSchema}
        >
          <Form className={classes.Form}>
            <div className={classes.FieldContainer}>
              <div className={classes.FieldTitle}>Enter current password: </div>
              <FormikInput
                name="current_password"
                type="password"
                placeholder="Current password"
              />
            </div>
            <div className={classes.FieldContainer}>
              <div className={classes.FieldTitle}>Enter new password: </div>
              <FormikInput
                name="password"
                type="password"
                placeholder="New password"
              />
            </div>
            <div className={classes.FieldContainer}>
              <div className={classes.FieldTitle}>Confirm new password: </div>
              <FormikInput
                name="password_confirmation"
                type="password"
                placeholder="New password"
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
            <Button text="Update password" type="submit" stylish="Primary" />
          </Form>
        </Formik>
      )}
    </div>
  )
}

export default PasswordForm

PasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  changePasswordError: PropTypes.string,
  changePasswordSuccess: PropTypes.string
}

PasswordForm.defaultProps = {
  changePasswordError: '',
  changePasswordSuccess: ''
}
