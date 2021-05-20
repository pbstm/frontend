import React from 'react'
import PropTypes from 'prop-types'
import classes from './Button.module.scss'

const Button = ({ text, onClick, submit }) => (
  <button
    className={classes.Button}
    onClick={onClick}
    type={submit ? 'submit' : 'button'}
  >
    {text}
  </button>
)

export { Button }

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  submit: PropTypes.func
}

Button.defaultProps = {
  onClick: null,
  text: '',
  submit: null
}
