import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../../components/Button'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../Profile.module.scss'

const EmailForm = ({
  onSubmitEmail,
  userEmail,
  changeEmailSuccess,
  changeEmailError
}) => {
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
    <form onSubmit={onSubmitEmail} className={classes.Form}>
      <div className={classes.FieldContainer}>
        <div className={classes.FieldTitle}>Email:</div>
        <div className={styles.formsControls}>
          <input onChange={activateEditMode} defaultValue={userEmail} />
        </div>

      </div>
      {!editMode && changeEmailSuccess && (
        <div className={styles.formSummarySuccess}>{changeEmailSuccess}</div>
      )}
      {editMode && (
        <div className={classes.Form}>
          <div className={classes.FieldContainer}>
            <div className={classes.FieldTitle}>Enter your password: </div>
            <div className={styles.formsControls}>
              <input type="password" placeholder="Password" />
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
