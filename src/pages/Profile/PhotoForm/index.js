import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Dropzone from 'react-dropzone'
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

  const onMainPhotoDropped = (files) => {
    if (files?.length) {
      onSubmitPhoto(files[0])
    }
  }

  const Avatar = () => {
    if (avatarUrl !== null) {
      return (
        <div className={classes.Avatar}>
          <Dropzone onDrop={(files) => onMainPhotoDropped(files)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <img src={avatarUrl} alt="" />
              </div>
            )}
          </Dropzone>
        </div>
      )
    }
    return (
      <div className={classes.AvatarBlank}>
        <Dropzone onDrop={(files) => onMainPhotoDropped(files)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div>{t('components.dropzone.drop')}</div>
            </div>
          )}
        </Dropzone>
      </div>
    )
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
