import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const mainUrl = '/'
const cabinetUrl = '/cabinet'
const customerCabinetUrl = '/customercabinet'
const profileUrl = '/profile'
const loginUrl = '/login'
const registerUrl = '/register'

export const MainLink = () => {
  const { t } = useTranslation()
  return (
    <NavLink to={mainUrl}>
      <span>{t('components.links.main')}</span>
    </NavLink>
  )
}

export const СabinetLink = () => {
  const { t } = useTranslation()
  return (
    <NavLink to={cabinetUrl}>
      <span>{t('components.links.cabinet')}</span>
    </NavLink>
  )
}

export const СustomerCabinetLink = () => {
  const { t } = useTranslation()
  return (
    <NavLink to={customerCabinetUrl}>
      <span>{t('components.links.customerCabinet')}</span>
    </NavLink>
  )
}

export const ProfileLink = () => {
  const { t } = useTranslation()
  return (
    <NavLink to={profileUrl}>
      <span>{t('components.links.profile')}</span>
    </NavLink>
  )
}

export const LoginLink = () => {
  const { t } = useTranslation()
  return (
    <NavLink to={loginUrl}>
      <span>{t('components.links.login')}</span>
    </NavLink>
  )
}

export const RegisterLink = () => {
  const { t } = useTranslation()
  return (
    <NavLink to={registerUrl}>
      <span>{t('components.links.register')}</span>
    </NavLink>
  )
}
