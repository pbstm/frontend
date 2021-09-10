import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../Profile.module.scss'

const NameForm = ({ userName, onSubmitName }) => {
  const { t } = useTranslation()

  const changeNameHandler = (formData) => {
    const name = formData.target.value
    if (userName !== name) {
      onSubmitName(name)
    }
  }
  return (
    <div className={classes.FieldContainer}>
      <div className={classes.FieldTitle}>{t('forms.titles.name')}</div>
      <div className={styles.formsControls}>
        <input onBlur={changeNameHandler} defaultValue={userName} />
      </div>
    </div>
  )
}

export default NameForm

NameForm.propTypes = {
  onSubmitName: PropTypes.func.isRequired,
  userName: PropTypes.string
}

NameForm.defaultProps = {
  userName: PropTypes.string
}
