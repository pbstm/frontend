import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../Profile.module.scss'

type NameFormPropsType = {
  onSubmitName: (name: string) => void,
  userName: string
}

const NameForm: React.FC<NameFormPropsType> = ({ userName, onSubmitName }) => {
  const { t } = useTranslation()

  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.value
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
