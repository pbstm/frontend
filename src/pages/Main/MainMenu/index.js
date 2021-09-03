import React from 'react'
import { useSelector } from 'react-redux'
// prettier-ignore
import { selectIsAuth, selectType } from '../../../redux/authSelectors'
// prettier-ignore
import { mainLink, cabinetLink, customerCabinetLink, loginLink, registerLink } from '../../../const/Url'
import UserInfoBlock from '../../../components/UserInfoBlock'
import ChangeLanguageBlock from '../../../components/ChangeLanguageBlock'
import classes from './MainMenu.module.scss'

const MainMenu = () => {
  const auth = useSelector(selectIsAuth)
  const userType = useSelector(selectType)

  const CabinetLinksBlock = () => {
    if (userType === 'Customer') {
      return customerCabinetLink
    }
    return cabinetLink
  }

  const LoginBlock = () => {
    if (auth) {
      return (
        <div className={classes.UserBlock}>
          <CabinetLinksBlock />
          <div className={classes.UserInfoBlock}>
            <UserInfoBlock />
          </div>
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

  return (
    <nav className={classes.Nav}>
      {mainLink}
      <div className={classes.RightBlock}>
        <LoginBlock />
        <ChangeLanguageBlock />
      </div>
    </nav>
  )
}

export default MainMenu
