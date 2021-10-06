import React from 'react'
import PropTypes from 'prop-types'
import classes from './Button.module.scss'

const Button = ({ text, onClick, stylish, type }) => (
  <button className={`${classes.Button} ${classes[stylish]}`} onClick={onClick} type={type}>
    {text}
  </button>
)

export { Button }

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  stylish: PropTypes.string,
  type: PropTypes.string
}

Button.defaultProps = {
  onClick: null,
  text: '',
  stylish: '',
  type: null
}
