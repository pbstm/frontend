import React from 'react'
import { mainLink } from '../../../const/Url'
import UserInfoBlock from '../../../components/UserInfoBlock'
import classes from './CustomerCabinetMenu.module.scss'

const CustomerCabinetMenu = () => (
  <nav className={classes.Nav}>
    {mainLink}
    <UserInfoBlock />
  </nav>
)

export default CustomerCabinetMenu
