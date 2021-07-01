import React from 'react'
import { Redirect, withRouter, NavLink } from 'react-router-dom'
import { compose } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsAuth, selectName } from '../../redux/authSelectors'
import { logout } from '../../redux/authReducer'

const CustomerCabinet = () => {
  const isAuth = useSelector(selectIsAuth)
  const name = useSelector(selectName)
  const dispatch = useDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  }

  if (!isAuth) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <h1>Customer cabinet</h1>
      <div>
        <div>{name}</div>
        <button onClick={logoutCallback}>logout</button>
      </div>
      <NavLink to="/">
        <span>Main</span>
      </NavLink>
    </>
  )
}

export default compose(withRouter)(CustomerCabinet)
