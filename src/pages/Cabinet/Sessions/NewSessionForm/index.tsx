import React, { useState, useRef, ChangeEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Button } from '../../../../components/Button'
import classes from './SessionForm.module.scss'
import styles from '../../../../components/FormsControls.module.scss'

type NewSessionFormValuesType = {
  title: string;
  description: string,
  cover: File | null
}

type NewSessionFormPropsType = {
  onSubmit: (values: NewSessionFormValuesType) => void,
  onClose: () => void,
}

const NewSessionForm: React.FC<NewSessionFormPropsType> = ({ onSubmit, onClose }) => {
  const { t } = useTranslation()
  const inputPhoto = useRef<HTMLInputElement>(null)

  const initialValues = {
    title: ``,
    description: '',
    cover: null
  }

  const [values, setValues] = useState(initialValues)

  interface ErrorsType{
    title?: string,
    description?: string,
    cover?: string
  }

  // prettier-ignore
  const [errors, setErrors] = useState<ErrorsType>({

  })

  const [url, setUrl] = useState()

  const titleRequired = (value: string) => {
    if (value) return undefined
    return t('cabinet.sessions.forms.validators.fieldRequired')
  }

  const descriptionRequired = (value: string) => {
    if (value) return undefined
    return t('cabinet.sessions.forms.validators.fieldRequired')
  }

  const validate = {
    title: titleRequired,
    description: descriptionRequired
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setValues({
      ...values,
      [name]: value
    })
  }

  const handleBlur = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    // @ts-ignore
    const error = validate[name](value)
    // @ts-ignore
    const { [name]: oldError, ...rest } = errors

    setErrors({
      ...rest,
      ...(error && {
        [name]: error
      })
    })
  }

  const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
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

  const handleFile = (e: any) => {
    const content = e.target.result
    setUrl(content)
  }

  const onCoverSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const { name } = event.target
      const file = event.target.files[0]
      const fileData = new FileReader()
      fileData.onloadend = handleFile
      fileData.readAsDataURL(file)

      setValues({
        ...values,
        [name]: file
      })
    }
  }

  const Cover = () => {
    if (values.cover !== null) {
      return (
        <div className={classes.Cover}>
          <img src={url} alt="" />
        </div>
      )
    }
    return (
      <div className={classes.CoverBlank}>
        <div>{t('cabinet.sessions.forms.titles.cover')}</div>
        <div>{t('cabinet.sessions.forms.titles.coverClick')}</div>
        {errors.cover && (
          // @ts-ignore
          <div className={styles.warning} tooltip={errors.cover}>
            !
          </div>
        )}
      </div>
    )
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
              {/* @ts-ignore */}
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
              {/* @ts-ignore */}
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
        <Cover />
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
