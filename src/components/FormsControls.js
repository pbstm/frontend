import React from 'react'
import { Field } from 'redux-form'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import classes from './FormsControls.module.scss'

const FormControl = ({ meta, children }) => {
  const hasError = meta.touched && meta.error
  return (
    <div
      className={classNames(
        classes.formsControls,
        hasError ? classes.error : ''
      )}
    >
      {children}
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

export const Input = (props) => {
  const { input, meta, ...restProps } = props
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
      <span />
    </FormControl>
  )
}

export function createField(placeholder, name, validators, component, props) {
  return (
    <>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />
    </>
  )
}

FormControl.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired
}

Input.propTypes = {
  meta: PropTypes.instanceOf(Object).isRequired,
  input: PropTypes.instanceOf(Object).isRequired
}
