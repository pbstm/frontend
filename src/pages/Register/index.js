import React from 'react'
import { reduxForm } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createField, Input } from '../../components/FormsControls'
import { required, maxLengthCreator } from '../../components/validators'
import { login } from '../../redux/authReducer'
import styles from '../../components/FormsControls.module.scss'
import classes from './Register.module.scss'

const maxLength30 = maxLengthCreator(30)

const RegisterForm = ({ handleSubmit, error }) => (
  <form className={classes.Form} onSubmit={handleSubmit}>
    <div className={classes.FieldContainer}>
      <div className={classes.FieldTitle}>Enter your email: </div>
      {createField('Email', 'email', [required, maxLength30], Input)}
    </div>
    <div className={classes.FieldContainer}>
      <div className={classes.FieldTitle}>Enter your password: </div>
      {createField('Password', 'password', [required, maxLength30], Input, {
        type: 'password'
      })}
    </div>
    <div className={classes.FieldContainer}>
      <div className={classes.FieldTitle}>Enter your password: </div>
      {createField('Password', 'password', [required, maxLength30], Input, {
        type: 'password'
      })}
    </div>

    {error && <div className={styles.formSummaryError}>{error}</div>}
    <button type="submit">Login</button>
  </form>
)

const RegisterReduxForm = reduxForm({
  form: 'register'
})(RegisterForm)

const Register = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const dispatch = useDispatch()

  const onSubmit = (formData) => {
    dispatch(login(formData.email, formData.password))
  }

  if (isAuth) <Redirect to="/cabinet" />

  return (
    <div className={classes.Container}>
      <RegisterReduxForm onSubmit={onSubmit} />
      <NavLink to="/login">
        <span>Login</span>
      </NavLink>
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
