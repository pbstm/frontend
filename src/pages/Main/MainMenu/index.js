import React from 'react'
import { NavLink } from 'react-router-dom'

const MainMenu = () => {
  return (
    <nav>
      <NavLink to="/">
        <span>Main</span>
      </NavLink>
      <NavLink to="/cabinet">
        <span>Cabinet</span>
      </NavLink>
    </nav>
  )
}

export default MainMenu
