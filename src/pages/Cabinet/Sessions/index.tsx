import React, { useState } from 'react'
import { Element } from 'react-scroll'
import { useTranslation } from 'react-i18next'
import classes from './Sessions.module.scss'
// @ts-ignore
import Slider from './Slider/index.tsx'
// @ts-ignore
import { Button, ButtonStyles } from '../../../components/Button/index.tsx'
// @ts-ignore
import NewSessionForm from './NewSessionForm/index.tsx'

const Sessions: React.FC = () => {
  const { t } = useTranslation()

  const [editMode, setEditMode] = useState<boolean>(false)

  const handleChange = () => {
    setEditMode(true)
  }

  const onSubmitNewSessionForm = () => {
    setEditMode(false)
  }

  const onCloseNewSessionForm = () => {
    setEditMode(false)
  }

  return (
    <Element id="sessions" className="element" name="sessions">
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
            stylish={ButtonStyles.Primary}
            onClick={handleChange}
          />
        </div>
        {editMode && (
          <NewSessionForm
            onSubmit={onSubmitNewSessionForm}
            onClose={onCloseNewSessionForm}
          />
        )}
      </div>
    </Element>
  )
}

export default Sessions
