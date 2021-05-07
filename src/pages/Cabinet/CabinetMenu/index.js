import React, { useEffect } from 'react'
import { Link } from 'react-scroll'
import * as Scroll from 'react-scroll'
import { NavLink } from 'react-router-dom'
import classes from './CabinetMenu.module.scss'

const CabinetMenu = () => {
  const { scrollSpy } = Scroll

  useEffect(() => {
    scrollSpy.update()
  })

  return (
    <nav className={classes.Nav}>
      <div className={classes.MainLink}>
        <NavLink to="/" className={classes.Link}>
          <span>&spades;</span>
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

      <div className={classes.ProfileLink}>
        <NavLink to="/profile" className={classes.Link}>
          <span>&hearts;</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default CabinetMenu
