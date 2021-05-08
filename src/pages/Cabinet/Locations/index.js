import React from 'react'
import { Element } from 'react-scroll'
import classes from './Locations.module.scss'

const Locations = () => {
  return (
    <Element id="locations" className="element">
      <div className={classes.Locations}>Locations</div>
    </Element>
  )
}

export default Locations
