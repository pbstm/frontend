import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
// prettier-ignore
import { selectName, selectType, selectEmail, selectAvatarUrl } from '../../redux/authSelectors'
import { logout } from '../../redux/authReducer'
import { ProfileLink } from '../../const/Url'
import classes from './UserInfoBlock.module.scss'
import Backdrop from '../Backdrop'

const UserInfoBlock = () => {
  const { t } = useTranslation()
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
            <span className={classes.LoggedAs}>
              {t('components.userInfoBlock.loggedAs')}
            </span>
            <span>{userType}</span>
          </li>
          <li>
            <ProfileLink />
          </li>
          <li>
            <div
              className={classes.Link}
              onClick={logoutCallback}
              onKeyPress={logoutCallback}
              role="link"
              tabIndex={0}
            >
              {t('components.userInfoBlock.logout')}
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
        <Backdrop closeMenuMode={closeMenuMode} />
      ) : null}
    </div>
  )
}

export default UserInfoBlock
