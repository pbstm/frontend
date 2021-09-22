import React from 'react'
import { Element } from 'react-scroll'
import classes from './Sessions.module.scss'
import Slider from './Slider'

const Sessions = () => (
  <Element id="sessions" className="element">
    <div className={classes.Sessions}>Sessions</div>
    <Slider />
  </Element>
)

export default Sessions
