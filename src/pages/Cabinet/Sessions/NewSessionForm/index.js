import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Button } from '../../../../components/Button'
import classes from './SessionForm.module.scss'
import styles from '../../../../components/FormsControls.module.scss'

const NewSessionForm = () => {
  const { t } = useTranslation()

  const initialValues = {
    title: `Session 1`,
    description: 'Description 1'
  }

  const [values, setValues] = useState(initialValues)

  const [errors, setErrors] = useState({

  })

  const titleRequired = (value) => {
    if (value) return undefined
    return t('cabinet.sessions.forms.validators.fieldRequired')
  }

  const descriptionRequired = (value) => {
    if (value) return undefined
    return t('cabinet.sessions.forms.validators.fieldRequired')
  }

  const validate = {
    title: titleRequired,
    description: descriptionRequired
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues({
      ...values,
      [name]: value
    })
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
    console.log(values)
  }

  return (
    <form onSubmit={handleSumbit} className={classes.Form}>
      <h2>{t('cabinet.sessions.forms.titles.formTitle')}</h2>
      <div className={classes.FieldContainer}>
        <div className={classes.FieldTitle}>
          {t('cabinet.sessions.forms.titles.title')}
        </div>
        <div
          className={classNames(
            styles.formsControls,
            classes.Field,
            errors.title ? styles.error : ''
          )}
        >
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="title"
            required
          />
          {errors.title && (
            <div>
              <div className={styles.warning} tooltip={errors.title}>
                !
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={classes.FieldContainer}>
        <div className={classes.FieldTitle}>
          {t('cabinet.sessions.forms.titles.description')}
        </div>
        <div
          className={classNames(
            styles.formsControls,
            classes.Field,
            errors.description ? styles.error : ''
          )}
        >
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="description"
            required
          />
          {errors.description && (
            <div>
              <div className={styles.warning} tooltip={errors.description}>
                !
              </div>
            </div>
          )}
        </div>
      </div>
      <Button
        text={t('cabinet.sessions.forms.buttons.save')}
        type="submit"
        stylish="Primary"
      />
    </form>
  )
}

export default NewSessionForm
