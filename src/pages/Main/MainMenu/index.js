import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// prettier-ignore
import { selectName, selectIsAuth, selectType } from '../../../redux/authSelectors'
import { logout } from '../../../redux/authReducer'
// prettier-ignore
import { mainLink, cabinetLink, customerCabinetLink, profileLink, loginLink, registerLink } from '../../../const/Url'

const MainMenu = () => {
  const name = useSelector(selectName)
  const auth = useSelector(selectIsAuth)
  const userType = useSelector(selectType)
  const dispatch = useDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  }

  const CabinetLinksBlock = () => {
    if (userType === 'Customer') {
      return customerCabinetLink
    }
    return cabinetLink
  }

  const LoginBlock = () => {
    if (auth) {
      return (
        <div>
          тут залогинен:
          <div>{name}</div>
          <div>{userType}</div>
          <button onClick={logoutCallback}>logout</button>
          {profileLink}
          <CabinetLinksBlock />
        </div>
      )
    }
    return (
      <div>
        {loginLink}
        {registerLink}
      </div>
    )
  }

  // const mainLink = <div>Hello</div>

  return (
    <nav>
      {mainLink}
      <LoginBlock />
    </nav>
  )
}

export default MainMenu
