import React from 'react'
import { reduxForm } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createField, Input, Checkbox } from '../../components/FormsControls'
import { required, maxLengthCreator, email } from '../../components/validators'
import { login } from '../../redux/authReducer'
import { selectIsAuth, selectType } from '../../redux/authSelectors'
import styles from '../../components/FormsControls.module.scss'
import classes from '../Register/Register.module.scss'
import { Button } from '../../components/Button'
import { registerLink } from '../../const/Url'

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
    <div className={classes.FieldContainer}>
      <div className={classes.FieldTitle}>Sing in as photographer: </div>
      {createField(undefined, 'type', [], Checkbox)}
    </div>

    {error && <div className={styles.formSummaryError}>{error}</div>}

    <Button text="Sign in" type="submit" stylish="Primary" />
  </form>
)

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const userType = useSelector(selectType)
  const dispatch = useDispatch()

  const onSubmit = (formData) => {
    if (formData.type === true) {
      const type = 'Photographer'
      dispatch(login(formData.email, formData.password, type))
    } else {
      dispatch(login(formData.email, formData.password, formData.type))
    }
  }

  if (isAuth) {
    if (userType === 'Photographer') {
      return <Redirect to="/cabinet" />
    }
    return <Redirect to="/customercabinet" />
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
        {registerLink}
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
