import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-scroll'
import * as Scroll from 'react-scroll'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import classes from './CabinetMenu.module.scss'
import UserInfoBlock from '../../../components/UserInfoBlock'
import Backdrop from '../../../components/Backdrop'
import ButtonHamburger from '../../../components/ButtonHamburger'
import ChangeLanguageBlock from '../../../components/ChangeLanguageBlock'
import WindowDimensions from '../../../utils/windowDimensions'

const CabinetMenu = () => {
  const { t } = useTranslation()
  const { scrollSpy } = Scroll
  const [isMenuOpen, toggleMenu] = useState(false)
  const windowWidth = WindowDimensions()

  function toggleMenuMode() {
    toggleMenu(!isMenuOpen)
  }

  function closeMenuMode() {
    toggleMenu(false)
  }

  if (windowWidth.width > 846 && isMenuOpen) {
    closeMenuMode()
  }

  useEffect(() => {
    scrollSpy.update()
  })

  const floatMenuClass = (
    !isMenuOpen ?
      cn(classes.FloatMenu, classes.Close) :
      classes.FloatMenu
  )

  const LinkSession = () => (
    <Link
      activeClass={classes.ActiveScrollLink}
      to="sessions"
      spy
      smooth
      offset={-70}
      duration={500}
    >
      {t('components.links.photosessions')}
    </Link>
  )

  const LinkLocation = () => (
    <Link
      activeClass={classes.ActiveScrollLink}
      to="locations"
      spy
      smooth
      offset={-70}
      duration={500}
    >
      {t('components.links.locations')}
    </Link>
  )

  const LinkSchedule = () => (
    <Link
      activeClass={classes.ActiveScrollLink}
      to="schedule"
      spy
      smooth
      offset={-70}
      duration={500}
    >
      {t('components.links.schedule')}
    </Link>
  )

  const LinkAccessories = () => (
    <Link
      activeClass={classes.ActiveScrollLink}
      to="accessories"
      spy
      smooth
      offset={-70}
      duration={500}
    >
      {t('components.links.accessories')}
    </Link>
  )

  const Menu = () => (
    <nav className={cn(classes.Nav, classes.GeneralNav)}>
      <div className={classes.MainLink}>
        <NavLink to="/">
          <span>LOGO</span>
        </NavLink>
      </div>

      <ul className={classes.Sections}>
        <li className={classes.Section}>
          <LinkSession />
        </li>
        <li className={classes.Section}>
          <LinkLocation />
        </li>
        <li className={classes.Section}>
          <LinkSchedule />
        </li>
        <li className={classes.Section}>
          <LinkAccessories />
        </li>
      </ul>
      <div className={classes.UserBlock}>
        <UserInfoBlock />
        <ChangeLanguageBlock />
      </div>
    </nav>
  )

  const MenuHamburger = () => (
    <nav className={cn(classes.Nav, classes.HamburgerNav)}>
      <ButtonHamburger
        isMenuOpen={isMenuOpen}
        toggleMenuMode={toggleMenuMode}
      />
      <NavLink to="/">
        <span>LOGO</span>
      </NavLink>
      <div
        className={floatMenuClass}
        onClick={closeMenuMode}
        onKeyPress={closeMenuMode}
        role="link"
        tabIndex={0}
      >
        <nav className={classes.NavFloatMenu}>
          <ul className={classes.FloatSections}>
            <li className={classes.FloatSection}>
              <LinkSession />
            </li>
            <li className={classes.FloatSection}>
              <LinkLocation />
            </li>
            <li className={classes.FloatSection}>
              <LinkSchedule />
            </li>
            <li className={classes.FloatSection}>
              <LinkAccessories />
            </li>
          </ul>
        </nav>
      </div>
      {isMenuOpen ? <Backdrop closeMenuMode={closeMenuMode} /> : null}
      <div className={classes.UserBlock}>
        <UserInfoBlock />
        <ChangeLanguageBlock />
      </div>
    </nav>
  )

  if (windowWidth.width < 847) {
    return <MenuHamburger />
  }
  return <Menu />
}

export default CabinetMenu
