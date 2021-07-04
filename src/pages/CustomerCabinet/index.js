import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsAuth, selectName } from '../../redux/authSelectors'
import { logout } from '../../redux/authReducer'
import { mainLink, profileLink } from '../../const/Url'

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
      {profileLink}
      {mainLink}
    </>
  )
}

export default compose(withRouter)(CustomerCabinet)
