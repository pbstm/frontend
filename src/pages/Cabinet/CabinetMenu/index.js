import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-scroll'
import * as Scroll from 'react-scroll'
import classes from './CabinetMenu.module.scss'
import { selectName } from '../../../redux/authSelectors'
import { logout } from '../../../redux/authReducer'
import { profileLink } from '../../../const/Url'

const CabinetMenu = () => {
  const { scrollSpy } = Scroll
  const name = useSelector(selectName)
  const dispatch = useDispatch()

  useEffect(() => {
    scrollSpy.update()
  })

  const logoutCallback = () => {
    dispatch(logout())
  }

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

      <div>
        <div>{name}</div>
        <button onClick={logoutCallback}>logout</button>
      </div>
      {profileLink}
    </nav>
  )
}

export default CabinetMenu
