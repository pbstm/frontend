import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/Button'
import classes from './PhotoForm.module.scss'

const PhotoForm = ({ avatarUrl, onSubmitPhoto }) => {
  const { t } = useTranslation()
  const inputPhoto = useRef()

  const onBtnClickLoadPhoto = () => {
    if (inputPhoto && inputPhoto.current) {
      inputPhoto.current.click()
    }
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files?.length) {
      onSubmitPhoto(e.target.files[0])
    }
  }

  const Avatar = () => {
    if (avatarUrl !== null) {
      return (
        <div className={classes.Avatar}>
          <img src={avatarUrl} alt="" />
        </div>
      )
    }
    return <div className={classes.AvatarBlank} />
  }

  return (
    <div className={classes.AvatarContainer}>
      <Avatar />
      <div>
        <input
          ref={inputPhoto}
          type="file"
          onChange={onMainPhotoSelected}
          className={classes.InputFile}
        />
        <Button
          text={t('forms.buttons.loadPhoto')}
          onClick={onBtnClickLoadPhoto}
          stylish="Primary"
        />
      </div>
    </div>
  )
}

export default PhotoForm

PhotoForm.propTypes = {
  onSubmitPhoto: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string
}

PhotoForm.defaultProps = {
  avatarUrl: PropTypes.string
}
