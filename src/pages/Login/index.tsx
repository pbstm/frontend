import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// @ts-ignore
import { login } from '../../redux/authReducer.ts'
// prettier-ignore
import { selectIsAuth, selectType, selectLoginError } from '../../redux/authSelectors'
import classes from '../Register/Register.module.scss'
import { RegisterLink } from '../../const/Url'
// @ts-ignore
import LoginForm, { LoginFormValuesType } from './LoginForm/index.tsx'
import ChangeLanguageBlock from '../../components/ChangeLanguageBlock'

const Login: React.FC = () => {
  const { t } = useTranslation()
  const isAuth = useSelector(selectIsAuth)
  const userType = useSelector(selectType)
  const loginError = useSelector(selectLoginError)
  const dispatch = useDispatch()

  const onSubmit = (values: LoginFormValuesType) => {
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
      <div className={classes.LangBlock}>
        <ChangeLanguageBlock />
      </div>
      <div className={classes.Title}>{t('login.title')}</div>
      <LoginForm onSubmit={onSubmit} loginError={loginError} />
      <div className={classes.RegBlock}>
        <div>{t('login.accountQuestion')}</div>
        <RegisterLink />
      </div>
    </div>
  )
}

export default Login
