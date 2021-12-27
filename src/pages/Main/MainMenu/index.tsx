import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuth, selectType } from '../../../redux/authSelectors'
// prettier-ignore
import { MainLink, СabinetLink, СustomerCabinetLink, LoginLink, RegisterLink } from '../../../const/Url'
import UserInfoBlock from '../../../components/UserInfoBlock'
import ChangeLanguageBlock from '../../../components/ChangeLanguageBlock'
import classes from './MainMenu.module.scss'

const MainMenu = () => {
  const auth = useSelector(selectIsAuth)
  const userType = useSelector(selectType)

  const CabinetLinksBlock = () => {
    if (userType === 'Customer') {
      return <СustomerCabinetLink />
    }
    return <СabinetLink />
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
        <LoginLink />
        <RegisterLink />
      </div>
    )
  }

  return (
    <nav className={classes.Nav}>
      <MainLink />
      <div className={classes.RightBlock}>
        <LoginBlock />
        <ChangeLanguageBlock />
      </div>
    </nav>
  )
}

export default MainMenu
