import React from 'react'
import { NavLink } from 'react-router-dom'

const MainMenu = () => (
  <nav>
    <NavLink to="/">
      <span>Main</span>
    </NavLink>
    <NavLink to="/cabinet">
      <span>Cabinet</span>
    </NavLink>
    <NavLink to="/login">
      <span>Login</span>
    </NavLink>
    <NavLink to="/register">
      <span>Register</span>
    </NavLink>
  </nav>
)

export default MainMenu
