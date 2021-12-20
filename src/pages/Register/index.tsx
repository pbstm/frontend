import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// @ts-ignore
import { register } from '../../redux/authReducer.ts'
import { selectIsAuth, selectRegisterError } from '../../redux/authSelectors'
import classes from './Register.module.scss'
import { LoginLink } from '../../const/Url'
// @ts-ignore
import RegisterForm, { RegisterFormValuesType } from './RegisterForm/index.tsx'
import ChangeLanguageBlock from '../../components/ChangeLanguageBlock'

const Register: React.FC = () => {
  const { t } = useTranslation()
  const isAuth = useSelector(selectIsAuth)
  const registerError = useSelector(selectRegisterError)
  const dispatch = useDispatch()

  const onSubmit = (values: RegisterFormValuesType) => {
    dispatch(
      register(
        values.name,
        values.email,
        values.password,
        values.password_confirmation
      )
    )
  }

  if (isAuth) <Redirect to="/cabinet" />

  return (
    <div className={classes.Container}>
      <div className={classes.Logo}>
        <NavLink to="/">LOGO</NavLink>
      </div>
      <div className={classes.LangBlock}>
        <ChangeLanguageBlock />
      </div>
      <div className={classes.Title}>{t('register.title')}</div>
      <RegisterForm onSubmit={onSubmit} registerError={registerError} />
      <div className={classes.RegBlock}>
        <div>{t('register.accountQuestion')}</div>
        <LoginLink />
      </div>
    </div>
  )
}

export default Register
