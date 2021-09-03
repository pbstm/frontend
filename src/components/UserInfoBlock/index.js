import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
// prettier-ignore
import { selectName, selectType, selectEmail, selectAvatarUrl } from '../../redux/authSelectors'
import { logout } from '../../redux/authReducer'
import { profileLink } from '../../const/Url'
import classes from './UserInfoBlock.module.scss'

const UserInfoBlock = () => {
  const userType = useSelector(selectType)
  const userName = useSelector(selectName)
  const userEmail = useSelector(selectEmail)
  const avatarUrl = useSelector(selectAvatarUrl)
  const dispatch = useDispatch()

  const [isMenuOpen, toggleMenu] = useState(false)

  function toggleMenuMode() {
    toggleMenu(!isMenuOpen)
  }

  function closeMenuMode() {
    toggleMenu(false)
  }

  const logoutCallback = () => {
    dispatch(logout())
  }

  const NameInAva = () => {
    if (userName) {
      return userName.charAt(0)
    }
    return null
  }

  return (
    <div className={classes.UserBlock}>
      <div
        className={classNames(classes.Dropdown, isMenuOpen ? classes.Open : '')}
        onClick={toggleMenuMode}
        onKeyPress={toggleMenuMode}
        role="link"
        tabIndex={0}
      >
        <ul>
          <li>{userName}</li>
          <li>{userEmail}</li>
          <li>
            <span className={classes.LoggedAs}>logged as: </span>
            <span>{userType}</span>
          </li>
          <li>{profileLink}</li>
          <li>
            <div
              className={classes.Link}
              onClick={logoutCallback}
              onKeyPress={logoutCallback}
              role="link"
              tabIndex={0}
            >
              logout
            </div>
          </li>
        </ul>
      </div>
      <div className={classes.Ava}>
        {avatarUrl !== null ? (
          <img src={avatarUrl} alt="" />
        ) : (
          <div className={classes.NoAva}>
            <NameInAva />
          </div>
        )}
      </div>
      {isMenuOpen ? (
        <div
          className={classes.Backdrop}
          onClick={closeMenuMode}
          onKeyPress={closeMenuMode}
          role="link"
          tabIndex={0}
        >
          .
        </div>
      ) : null}
    </div>
  )
}

export default UserInfoBlock
