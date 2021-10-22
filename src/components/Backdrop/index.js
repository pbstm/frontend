import React from 'react'
import PropTypes from 'prop-types'
import classes from './Backdrop.module.scss'

const Backdrop = ({ closeMenuMode }) => (
  <div
    className={classes.Backdrop}
    onClick={closeMenuMode}
    onKeyPress={closeMenuMode}
    role="link"
    tabIndex={0}
  >
    .
  </div>
)

export default Backdrop

Backdrop.propTypes = {
  closeMenuMode: PropTypes.func.isRequired
}
