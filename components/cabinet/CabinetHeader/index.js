import React, { useEffect } from 'react'
import classNames from 'classnames'
import { Link } from 'react-scroll'
import * as Scroll from 'react-scroll'
import classes from '../../../styles/CabinetHeader.module.scss'

const CabinetHeader = () => {
  const { scrollSpy } = Scroll

  useEffect(() => {
    scrollSpy.update()
  })
  return (
    <>
      <div className={classes.Header}>
        <Link to="sessions" spy smooth offset={-70} duration={500}>
          <div className={classNames(classes.Card, classes.Sessions)}>
            <div className={classes.Darker}>
              <p>
                <span className={classes.BigText}>Create</span>
                <br />
                and manage
                <br />
                your
                <span className={classes.MidText}> photo sessions</span>
              </p>
            </div>
          </div>
        </Link>

        <Link to="locations" spy smooth offset={-70} duration={500}>
          <div className={classNames(classes.Card, classes.Locations)}>
            <div className={classes.Darker}>
              <p>
                Add new
                <br />
                interesting
                <br />
                <span className={classes.BigText}>locations</span>
                <br />
                in different cities
              </p>
            </div>
          </div>
        </Link>

        <Link to="schedule" spy smooth offset={-70} duration={500}>
          <div className={classNames(classes.Card, classes.Schedule)}>
            <div className={classes.Darker}>
              <p>
                Manage your
                <br />
                <span className={classes.BigText}>schedule</span>
                <br />
                and
                <span className={classes.MidText}> cell tickets</span>
                <br />
                to a photo session
              </p>
            </div>
          </div>
        </Link>

        <Link to="accessories" spy smooth offset={-70} duration={500}>
          <div className={classNames(classes.Card, classes.Accessories)}>
            <div className={classes.Darker}>
              <p>
                Suggest cool
                <br />
                <span className={classes.BigText}>accessories</span>
                <br />
                for the
                <br />
                photo shoot
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default CabinetHeader
