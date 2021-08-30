import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { FormikInput } from '../../../components/FormsControls'
import { Button } from '../../../components/Button'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../Register.module.scss'

const RegisterForm = ({ onSubmit, registerError }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  const validationsSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .matches(
        /^[\s\S]{3,30}$/,
        'Name must be at least 3 and no more than 30 characters'
      ),
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Invalid email address'
      ),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^[\s\S]{6,30}$/,
        'Password must be at least 6 and no more than 30 characters'
      ),
    password_confirmation: yup
      .string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password'), null], 'Passwords must be equal')
  })
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={(values) => {
          onSubmit(values)
        }}
        validationSchema={validationsSchema}
      >
        <Form className={classes.Form} data-testid="form">
          <div className={classes.FieldContainer}>
            <div className={classes.FieldTitle}>Enter your name: </div>
            <FormikInput name="name" placeholder="Name" data-testid="name" />
          </div>
          <div className={classes.FieldContainer}>
            <div className={classes.FieldTitle}>Enter your email: </div>
            <FormikInput
              name="email"
              type="email"
              placeholder="Email"
              data-testid="email"
            />
          </div>
          <div className={classes.FieldContainer}>
            <div className={classes.FieldTitle}>Enter your password: </div>
            <FormikInput
              name="password"
              type="password"
              placeholder="Password"
              data-testid="password"
            />
          </div>
          <div className={classes.FieldContainer}>
            <div className={classes.FieldTitle}>Confirm password: </div>
            <FormikInput
              name="password_confirmation"
              type="password"
              placeholder="Password"
              data-testid="password_confirmation"
            />
          </div>
          {registerError && (
            <div className={styles.formSummaryError}>{registerError}</div>
          )}

          <Button text="Sign in" type="submit" stylish="Primary" />
        </Form>
      </Formik>
    </div>
  )
}

export default RegisterForm

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  registerError: PropTypes.string
}

RegisterForm.defaultProps = {
  registerError: ''
}
