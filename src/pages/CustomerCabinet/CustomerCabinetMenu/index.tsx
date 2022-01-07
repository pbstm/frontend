import React from 'react'
import { MainLink } from '../../../const/Url'
import UserInfoBlock from '../../../components/UserInfoBlock'
import classes from './CustomerCabinetMenu.module.scss'

const CustomerCabinetMenu: React.FC = () => (
  <nav className={classes.Nav}>
    <MainLink />
    <UserInfoBlock />
  </nav>
)

export default CustomerCabinetMenu
