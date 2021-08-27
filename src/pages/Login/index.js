import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { login } from '../../redux/authReducer'
import { selectIsAuth, selectType, selectLoginError } from '../../redux/authSelectors'
import classes from '../Register/Register.module.scss'
import { registerLink } from '../../const/Url'
import LoginForm from './LoginForm'

const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const userType = useSelector(selectType)
  const loginError = useSelector(selectLoginError)
  const dispatch = useDispatch()

  const onSubmit = (values) => {
    let type
    if (values.type === true) {
      type = 'Photographer'
    } else {
      type = 'Customer'
    }
    dispatch(login(values.email, values.password, type))
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
      <LoginForm onSubmit={onSubmit} loginError={loginError} />
      <div className={classes.RegBlock}>
        <div>Dont have an account yet?</div>
        {registerLink}
      </div>
    </div>
  )
}

export default Login
