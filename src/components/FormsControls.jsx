import React from 'react'
import classes from './FormsControls.module.scss'
import { Field } from 'redux-form'

const FormControl = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error
  return (
    <div
      className={classes.formsControls + ' ' + (hasError ? classes.error : '')}
    >
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Input = (props) => {
  const { input, meta, ...restProps } = props
  return (
    <FormControl {...props}>
      <label>
        <input {...input} {...restProps} />
        <span></span>
      </label>
    </FormControl>
  )
}

export function createField(
  placeholder,
  name,
  validators,
  component,
  props = {},
  text = ''
) {
  return (
    <>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />{' '}
      {text}
    </>
  )
}
