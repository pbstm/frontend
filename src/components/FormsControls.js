import React from 'react'
import { useField } from 'formik'
import classNames from 'classnames'
import classes from './FormsControls.module.scss'

export const FormikInput = ({ ...props }) => {
  const [field, meta] = useField(props)
  const hasError = meta.touched && meta.error
  return (
    <div
      className={classNames(
        classes.formsControls,
        hasError ? classes.error : ''
      )}
    >
      <input {...field} {...props} />
      {hasError && (
        <div>
          <div className={classes.warning} tooltip={meta.error}>
            !
          </div>
        </div>
      )}
    </div>
  )
}

export const FormikCheckbox = ({ ...props }) => {
  const [field] = useField(props)
  return (
    <label>
      <input type="checkbox" {...field} {...props} />
      <span />
    </label>
  )
}
