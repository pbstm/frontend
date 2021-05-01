import { Link } from 'react-scroll'
import * as Scroll from 'react-scroll'
import React, { useEffect } from 'react'
import ActiveLink from '../../common/ActiveLink'
import classes from '../../../styles/CabinetMenu.module.scss'

const CabinetMenu = () => {
  const { scrollSpy } = Scroll

  useEffect(() => {
    scrollSpy.update()
  })

  return (
    <nav className={classes.Nav}>
      <div className="justify-self-start self-center px-5">
        <ActiveLink activeClassName="" href="/">
          <a href="/">&spades;</a>
        </ActiveLink>
      </div>

      <ul className={classes.Sections}>
        <li className={classes.Section}>
          <Link
            activeClass="text-yellow-400"
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
            activeClass="text-yellow-400"
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
            activeClass="text-yellow-400"
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
            activeClass="text-yellow-400"
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

      <div className="justify-self-end self-center px-5">
        <ActiveLink activeClassName="" href="/profile">
          <a href="/profile">&hearts;</a>
        </ActiveLink>
      </div>
    </nav>
  )
}

export default CabinetMenu
