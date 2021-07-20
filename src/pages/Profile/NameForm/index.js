import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../Profile.module.scss'

const NameForm = ({ userName, onSubmitName }) => (
  <div className={classes.FieldContainer}>
    <div className={classes.FieldTitle}>Name: </div>
    <div className={styles.formsControls}>
      <input onBlur={onSubmitName} defaultValue={userName} />
    </div>
  </div>
)

export default NameForm

NameForm.propTypes = {
  onSubmitName: PropTypes.func.isRequired,
  userName: PropTypes.string
}

NameForm.defaultProps = {
  userName: PropTypes.string
}
