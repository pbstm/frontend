import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Button } from '../../../../components/Button'
import classes from './SessionForm.module.scss'
import styles from '../../../../components/FormsControls.module.scss'

const NewSessionForm = ({ onSubmit, onClose }) => {
  const { t } = useTranslation()
  const inputPhoto = useRef()

  const initialValues = {
    title: ``,
    description: '',
    cover: null
  }

  const [values, setValues] = useState(initialValues)
  // prettier-ignore
  const [errors, setErrors] = useState({

  })
  const [url, setUrl] = useState()

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
    if (values.cover !== null) {
      onSubmit(values)
    } else {
      const name = 'cover'
      const error = t('cabinet.sessions.forms.validators.coverRequired')
      const { [name]: oldError, ...rest } = errors

      setErrors({
        ...rest,
        ...(error && {
          [name]: error
        })
      })
    }
  }

  const onBtnClickLoadCover = () => {
    if (inputPhoto && inputPhoto.current) {
      inputPhoto.current.click()
    }
  }

  const handleFile = (e) => {
    const content = e.target.result
    setUrl(content)
    // You can set content in state and show it in render.
  }

  const onCoverSelected = (event) => {
    const { name } = event.target
    const file = event.target.files[0]
    const fileData = new FileReader()
    fileData.onloadend = handleFile
    if (event.target.files[0]) {
      fileData.readAsDataURL(file)
    }

    setValues({
      ...values,
      [name]: file
    })
  }

  return (
    <form onSubmit={handleSumbit} className={classes.Form}>
      <h2>{t('cabinet.sessions.forms.titles.formNewTitle')}</h2>
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
            placeholder={t('cabinet.sessions.forms.placeholders.title')}
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
          <textarea
            onChange={handleChange}
            onBlur={handleBlur}
            name="description"
            placeholder={t('cabinet.sessions.forms.placeholders.description')}
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
      <div className={classes.CoverContainer}>
        <input
          ref={inputPhoto}
          type="file"
          name="cover"
          onChange={onCoverSelected}
          className={classes.InputFile}
        />
        <div>
          {values.cover !== null ? (
            <div className={classes.Cover}>
              <img src={url} alt="" />
            </div>
          ) : (
            <div className={classes.CoverBlank}>
              <div>{t('cabinet.sessions.forms.titles.cover')}</div>
              <div>{t('cabinet.sessions.forms.titles.coverClick')}</div>
              {errors.cover && (
                <div className={styles.warning} tooltip={errors.cover}>
                  !
                </div>
              )}
            </div>
          )}
        </div>
        <Button
          text={t('cabinet.sessions.forms.buttons.loadCover')}
          type="button"
          stylish="PrimarySmall"
          onClick={onBtnClickLoadCover}
        />
      </div>
      <div className={classes.Btns}>
        <div>
          <Button
            text={t('cabinet.sessions.forms.buttons.save')}
            type="submit"
            stylish="Primary"
          />
        </div>
        <div>
          <Button
            text={t('cabinet.sessions.forms.buttons.cancel')}
            type="reset"
            stylish="Secondary"
            onClick={onClose}
          />
        </div>
      </div>
    </form>
  )
}

export default NewSessionForm

NewSessionForm.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func
}

NewSessionForm.defaultProps = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func
}
