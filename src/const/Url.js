import React from 'react'
import { NavLink } from 'react-router-dom'

const mainUrl = '/'
const cabinetUrl = '/cabinet'
const customerCabinetUrl = '/customercabinet'
const profileUrl = '/profile'
const loginUrl = '/login'
const registerUrl = '/register'

export const mainLink = (
  <NavLink to={mainUrl}>
    <span>Main</span>
  </NavLink>
)

export const cabinetLink = (
  <NavLink to={cabinetUrl}>
    <span>Cabinet</span>
  </NavLink>
)

export const customerCabinetLink = (
  <NavLink to={customerCabinetUrl}>
    <span>Cabinet</span>
  </NavLink>
)

export const profileLink = (
  <NavLink to={profileUrl}>
    <span>Profile</span>
  </NavLink>
)

export const loginLink = (
  <NavLink to={loginUrl}>
    <span>Sign in</span>
  </NavLink>
)

export const registerLink = (
  <NavLink to={registerUrl}>
    <span>Sign up</span>
  </NavLink>
)
