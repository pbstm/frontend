import React from 'react'
import { NavLink } from 'react-router-dom'

const CabinetMenu = () => {
  return (
    <nav>
      <NavLink to="/">
        <span>Main</span>
      </NavLink>
    </nav>
  )
}

export default CabinetMenu
