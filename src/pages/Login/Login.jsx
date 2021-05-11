import React from 'react'
import styles from '../../components/FormsControls.module.scss'
import { reduxForm } from 'redux-form'
import { createField, Input } from '../../components/FormsControls'
import { required, maxLengthCreator } from '../../components/validators'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/authReducer'
import { Redirect } from 'react-router-dom'

const maxLength30 = maxLengthCreator(30)

const LoginForm = ({ handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.Email}>
        <div className={classes.Title}>Enter your email: </div>
        {createField <
          LoginFormValuesTypeKeys >
          ('Email', 'email', [required, maxLength30], Input)}
      </div>
      <div className={classes.Password}>
        <div className={classes.Title}>Enter your password: </div>
        {createField <
          LoginFormValuesTypeKeys >
          ('Password',
          'password',
          [required, maxLength30],
          Input,
          { type: 'password' })}
      </div>

      {error && <div className={styles.formSummaryError}>{error}</div>}
      <button>Login</button>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm)

const Login = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  const dispatch = useDispatch()

  const onSubmit = (formData) => {
    dispatch(login(formData.email, formData.password))
    console.log('dispatched', formData.email, formData.password)
  }

  if (isAuth) {
    return <Redirect to={'/cabinet'} />
  }

  return (
    <div className="container">
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  )
}

export default Login
