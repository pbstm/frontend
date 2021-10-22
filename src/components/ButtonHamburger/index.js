import React from 'react'
import PropTypes from 'prop-types'
import classes from './ButtonHamburger.module.scss'

const ButtonHamburger = ({ isMenuOpen, toggleMenuMode }) => {
  const cls = [classes.Hamburger]

  const clickHandler = () => {
    toggleMenuMode()
  }

  if (isMenuOpen) {
    cls.push(classes.Active)
  }

  return (
    <div
      className={cls.join(' ')}
      onClick={clickHandler}
      onKeyPress={clickHandler}
      role="link"
      tabIndex={0}
    >
      <span className={classes.Span} />
      <span className={classes.Span} />
      <span className={classes.Span} />
    </div>
  )
}

export default ButtonHamburger

ButtonHamburger.propTypes = {
  toggleMenuMode: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired
}
