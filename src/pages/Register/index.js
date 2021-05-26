import React from 'react'
import { reduxForm } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createField, Input } from '../../components/FormsControls'
// prettier-ignore
import { required, maxLengthCreator, minLengthCreator, email, matchPassword } from '../../components/validators'
import { register } from '../../redux/authReducer'
import styles from '../../components/FormsControls.module.scss'
import classes from './Register.module.scss'
import { Button } from '../../components/Button'

const maxLength30 = maxLengthCreator(30)
const minLength6 = minLengthCreator(6)

const RegisterForm = ({ handleSubmit, error }) => (
  <form className={classes.Form} onSubmit={handleSubmit}>
    <div className={classes.FieldContainer}>
      <div className={classes.FieldTitle}>Enter your name: </div>
      {createField('Name', 'name', [required, maxLength30], Input)}
    </div>
    <div className={classes.FieldContainer}>
      <div className={classes.FieldTitle}>Enter your email: </div>
      {createField('Email', 'email', [required, maxLength30, email], Input, {
        type: 'email'
      })}
    </div>
    <div className={classes.FieldContainer}>
      <div className={classes.FieldTitle}>Enter your password: </div>
      {createField(
        'Password',
        'password',
        [required, maxLength30, minLength6],
        Input,
        {
          type: 'password'
        }
      )}
    </div>
    <div className={classes.FieldContainer}>
      <div className={classes.FieldTitle}>Confirm your password: </div>
      {createField(
        'Password',
        'passwordConfirm',
        [required, maxLength30, minLength6, matchPassword],
        Input,
        {
          type: 'password'
        }
      )}
    </div>
    {error && <div className={styles.formSummaryError}>{error}</div>}
    <Button text="Sign up" type="submit" stylish="Primary" />
  </form>
)

const RegisterReduxForm = reduxForm({
  form: 'register'
})(RegisterForm)

const Register = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const dispatch = useDispatch()

  const onSubmit = (formData) => {
    dispatch(
      register(formData.email, formData.password, formData.passwordConfirm)
    )
  }

  if (isAuth) <Redirect to="/cabinet" />

  return (
    <div className={classes.Container}>
      <div className={classes.Logo}>
        <NavLink to="/">LOGO</NavLink>
      </div>
      <div className={classes.Title}>Register to Photobooking system</div>
      <RegisterReduxForm onSubmit={onSubmit} />
      <div className={classes.RegBlock}>
        <div>Already have an account?</div>
        <NavLink to="/login">
          <span>Sign in</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Register

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
}

RegisterForm.defaultProps = {
  error: ''
}
