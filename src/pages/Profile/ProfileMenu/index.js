import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectName, selectType } from '../../../redux/authSelectors'
import { logout } from '../../../redux/authReducer'
import { mainLink, cabinetLink, customerCabinetLink } from '../../../const/Url'

const ProfileMenu = () => {
  const name = useSelector(selectName)
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

  return (
    <nav>
      {mainLink}

      <div>
        Профиль пользователя:
        <div>{name}</div>
        <div>{userType}</div>
        <button onClick={logoutCallback}>logout</button>
      </div>
      <CabinetLinksBlock />
    </nav>
  )
}

export default ProfileMenu
