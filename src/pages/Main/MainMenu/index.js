import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
// prettier-ignore
import { selectName, selectIsAuth, selectType } from '../../../redux/authSelectors'
import { logout } from '../../../redux/authReducer'

const MainMenu = () => {
  const name = useSelector(selectName)
  const auth = useSelector(selectIsAuth)
  const userType = useSelector(selectType)
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
          <div>{name}</div>
          <div>{userType}</div>
          <button onClick={logoutCallback}>logout</button>
          {userType === 'Customer' ? (
            <NavLink to="/customercabinet">
              <span>Cabinet</span>
            </NavLink>
          ) : (
            <NavLink to="/cabinet">
              <span>Cabinet</span>
            </NavLink>
          )}
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
