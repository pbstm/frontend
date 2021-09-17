import React, { useEffect } from 'react'
import classNames from 'classnames'
import { Link } from 'react-scroll'
import * as Scroll from 'react-scroll'
import { useTranslation } from 'react-i18next'
import classes from './CabinetHeader.module.scss'

const CabinetHeader = () => {
  const { t } = useTranslation()
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
                <span className={classes.BigText}>
                  {t('cabinet.header.cards.photosessions.create')}
                </span>
                <br />
                {t('cabinet.header.cards.photosessions.manage')}
                <br />
                {t('cabinet.header.cards.photosessions.your')}
                <span className={classes.MidText}>
                  {t('cabinet.header.cards.photosessions.photosessions')}
                </span>
              </p>
            </div>
          </div>
        </Link>

        <Link to="locations" spy smooth offset={-70} duration={500}>
          <div className={classNames(classes.Card, classes.Locations)}>
            <div className={classes.Darker}>
              <p>
                {t('cabinet.header.cards.locations.add')}
                <br />
                <span className={classes.MidText}>
                  {t('cabinet.header.cards.locations.interesting')}
                </span>
                <br />
                <span className={classes.BigText}>
                  {t('cabinet.header.cards.locations.locations')}
                </span>
                <br />
                {t('cabinet.header.cards.locations.cities')}
              </p>
            </div>
          </div>
        </Link>

        <Link to="schedule" spy smooth offset={-70} duration={500}>
          <div className={classNames(classes.Card, classes.Schedule)}>
            <div className={classes.Darker}>
              <p>
                {t('cabinet.header.cards.schedule.manage')}
                <br />
                <span className={classes.BigText}>
                  {t('cabinet.header.cards.schedule.schedule')}
                </span>
                <br />
                {t('cabinet.header.cards.schedule.and')}
                <span className={classes.MidText}>
                  {t('cabinet.header.cards.schedule.celltickets')}
                </span>
                <br />
                {t('cabinet.header.cards.schedule.tosession')}
              </p>
            </div>
          </div>
        </Link>

        <Link to="accessories" spy smooth offset={-70} duration={500}>
          <div className={classNames(classes.Card, classes.Accessories)}>
            <div className={classes.Darker}>
              <p>
                {t('cabinet.header.cards.accessories.suggest')}
                <br />
                <span className={classes.MidText}>
                  {t('cabinet.header.cards.accessories.awesome')}
                </span>
                <br />
                <span className={classes.BigText}>
                  {t('cabinet.header.cards.accessories.accessories')}
                </span>
                <br />
                {t('cabinet.header.cards.accessories.to')}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default CabinetHeader
