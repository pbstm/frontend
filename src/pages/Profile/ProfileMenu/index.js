import React from 'react'
import { useSelector } from 'react-redux'
import { selectType } from '../../../redux/authSelectors'
import { MainLink, СabinetLink, СustomerCabinetLink } from '../../../const/Url'
import UserInfoBlock from '../../../components/UserInfoBlock'
import classes from './ProfileMenu.module.scss'

const ProfileMenu = () => {
  const userType = useSelector(selectType)

  const CabinetLinksBlock = () => {
    if (userType === 'Customer') {
      return <СustomerCabinetLink />
    }
    return <СabinetLink />
  }

  return (
    <nav className={classes.Nav}>
      <MainLink />
      <div className={classes.UserBlock}>
        <CabinetLinksBlock />
        <div className={classes.UserInfoBlock}>
          <UserInfoBlock />
        </div>
      </div>
    </nav>
  )
}

export default ProfileMenu
