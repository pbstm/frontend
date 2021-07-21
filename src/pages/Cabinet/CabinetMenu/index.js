import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-scroll'
import * as Scroll from 'react-scroll'
import classes from './CabinetMenu.module.scss'
import UserInfoBlock from '../../../components/UserInfoBlock'

const CabinetMenu = () => {
  const { scrollSpy } = Scroll

  useEffect(() => {
    scrollSpy.update()
  })

  return (
    <nav className={classes.Nav}>
      <div className={classes.MainLink}>
        <NavLink to="/" className={classes.Link}>
          <span>LOGO</span>
        </NavLink>
      </div>

      <ul className={classes.Sections}>
        <li className={classes.Section}>
          <Link
            activeClass={classes.ScrollLink}
            to="sessions"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            PHOTOSESSIONS
          </Link>
        </li>
        <li className={classes.Section}>
          <Link
            activeClass={classes.ScrollLink}
            to="locations"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            LOCATIONS
          </Link>
        </li>
        <li className={classes.Section}>
          <Link
            activeClass={classes.ScrollLink}
            to="schedule"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            SCHEDULE
          </Link>
        </li>
        <li className={classes.Section}>
          <Link
            activeClass={classes.ScrollLink}
            to="accessories"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            ACCESSORIES
          </Link>
        </li>
      </ul>

      <UserInfoBlock />
    </nav>
  )
}

export default CabinetMenu
