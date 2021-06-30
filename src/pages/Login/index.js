import React from 'react'
import { reduxForm } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createField, Input } from '../../components/FormsControls'
import { required, maxLengthCreator, email } from '../../components/validators'
import { login } from '../../redux/authReducer'
import { selectIsAuth } from '../../redux/authSelectors'
import styles from '../../components/FormsControls.module.scss'
import classes from '../Register/Register.module.scss'
import { Button } from '../../components/Button'

const maxLength30 = maxLengthCreator(30)

const LoginForm = ({ handleSubmit, error }) => (
  <form className={classes.Form} onSubmit={handleSubmit}>
    <div className={classes.FieldContainer}>
      <div className={classes.FieldTitle}>Enter your email: </div>
      {createField('Email', 'email', [required, maxLength30, email], Input, {
        type: 'email'
      })}
    </div>
    <div className={classes.FieldContainer}>
      <div className={classes.FieldTitle}>Enter your password: </div>
      {createField('Password', 'password', [required, maxLength30], Input, {
        type: 'password'
      })}
    </div>

    {error && <div className={styles.formSummaryError}>{error}</div>}

    <Button
      onClick={(customer) => handleSubmit(customer)}
      text="Sign in as customer"
      type="submit"
      stylish="Primary"
    />
    <Button
      onClick={(photographer) => handleSubmit(photographer)}
      text="Sign in as photographer"
      type="submit"
      stylish="Primary"
    />
  </form>
)

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const onSubmit = (formData, customer, photographer) => {
    if (photographer) {
      const type = 'Photographer'
      console.log(type)
      dispatch(login(formData.email, formData.password, type))
    } else if (customer) {
      const type = 'Customer'
      console.log(type)
      dispatch(login(formData.email, formData.password, type))
    }
  }

  if (isAuth) {
    return <Redirect to="/cabinet" />
  }

  return (
    <div className={classes.Container}>
      <div className={classes.Logo}>
        <NavLink to="/">LOGO</NavLink>
      </div>
      <div className={classes.Title}>Sign in to Photobooking system</div>
      <LoginReduxForm onSubmit={onSubmit} />
      <div className={classes.RegBlock}>
        <div>Dont have an account yet?</div>
        <NavLink to="/register">
          <span>Sign up</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Login

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
}

LoginForm.defaultProps = {
  error: ''
}
