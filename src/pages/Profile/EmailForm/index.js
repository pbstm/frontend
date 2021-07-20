import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { createField, Input } from '../../../components/FormsControls'
import { required, validEmail } from '../../../components/validators'
import { Button } from '../../../components/Button'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../Profile.module.scss'

const EmailForm = ({ handleSubmit, error, userEmail, changeEmailSuccess }) => {
  const [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setEditMode(true)
  }

  useEffect(() => {
    if (changeEmailSuccess) {
      setEditMode(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail])

  return (
    <form onSubmit={handleSubmit} className={classes.Form}>
      <div className={classes.FieldContainer}>
        <div className={classes.FieldTitle}>Email:</div>
        {createField(userEmail, 'email', [validEmail], Input, {
          type: 'email',
          onChange: activateEditMode
        })}
      </div>
      {!editMode && changeEmailSuccess && (
        <div className={styles.formSummarySuccess}>{changeEmailSuccess}</div>
      )}
      {editMode && (
        <div className={classes.Form}>
          <div className={classes.FieldContainer}>
            <div className={classes.FieldTitle}>Enter your password: </div>
            {createField('Password', 'current_password', [required], Input, {
              type: 'password'
            })}
          </div>

          {error && <div className={styles.formSummaryError}>{error}</div>}

          <Button text="Update email" type="submit" stylish="Primary" />
        </div>
      )}
    </form>
  )
}

const EmailReduxForm = reduxForm({
  form: 'email'
})(EmailForm)

export default EmailReduxForm

EmailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  error: PropTypes.string,
  changeEmailSuccess: PropTypes.string
}

EmailForm.defaultProps = {
  userEmail: PropTypes.string,
  error: '',
  changeEmailSuccess: ''
}
