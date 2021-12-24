import React from 'react'
import { Element } from 'react-scroll'
import classes from './Locations.module.scss'

const Locations: React.FC = () => (
  <Element id="locations" className="element" name="locations">
    <div className={classes.Locations}>Locations</div>
  </Element>
)

export default Locations
