import React, { useState } from 'react'
import { Element } from 'react-scroll'
import { useTranslation } from 'react-i18next'
import classes from './Sessions.module.scss'
import Slider from './Slider'
import { Button } from '../../../components/Button'
import NewSessionForm from './NewSessionForm'

const Sessions = () => {
  const { t } = useTranslation()

  const [editMode, setEditMode] = useState(false)

  const handleChange = () => {
    setEditMode(true)
  }

  return (
    <Element id="sessions" className="element">
      <div className={classes.Sessions}>
        <div className={classes.TextBlock}>
          <h1>{t('cabinet.sessions.title')}</h1>
          <p>{t('cabinet.sessions.description.part1')}</p>
          <p>{t('cabinet.sessions.description.part2')}</p>
          <p>{t('cabinet.sessions.description.part3')}</p>
        </div>
        <Slider />
        <div className={classes.CreateBtn}>
          <Button
            text={t('cabinet.sessions.forms.buttons.createPhotoSession')}
            type="submit"
            stylish="Primary"
            onClick={handleChange}
          />
        </div>
        {editMode && (
          <div className={classes.SessionForm}>
            <NewSessionForm />
          </div>
        )}
      </div>
    </Element>
  )
}

export default Sessions
