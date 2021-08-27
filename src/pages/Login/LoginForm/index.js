import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { FormikInput, FormikCheckbox } from '../../../components/FormsControls'
import { Button } from '../../../components/Button'
import styles from '../../../components/FormsControls.module.scss'
import classes from '../../Register/Register.module.scss'

const LoginForm = ({ onSubmit, loginError }) => {
  const initialValues = {
    email: '',
    password: '',
    type: false
  }

  const validationsSchema = yup.object().shape({
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
      )
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
            <div className={classes.FieldTitle}>Sign in as photographer: </div>
            <FormikCheckbox name="type" data-testid="checkbox" />
          </div>
          {loginError && (
            <div className={styles.formSummaryError}>{loginError}</div>
          )}

          <Button text="Sign in" type="submit" stylish="Primary" />
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loginError: PropTypes.string
}

LoginForm.defaultProps = {
  loginError: ''
}
