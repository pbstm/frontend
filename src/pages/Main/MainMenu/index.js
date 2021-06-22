import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectName, selectIsAuth } from '../../../redux/authSelectors'
import { logout } from '../../../redux/authReducer'

const MainMenu = () => {
  const name = useSelector(selectName)
  const auth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  }

  return (
    <nav>
      <NavLink to="/">
        <span>Main</span>
      </NavLink>

      {auth ? (
        <div>
          тут залогинен:
          {name}
          <NavLink to="/cabinet">
            <span>Cabinet</span>
          </NavLink>
          <button onClick={logoutCallback}>logout</button>
        </div>
      ) : (
        <div>
          <NavLink to="/login">
            <span>Login</span>
          </NavLink>
          <NavLink to="/register">
            <span>Register</span>
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default MainMenu
