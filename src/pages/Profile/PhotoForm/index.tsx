import React, { useRef, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Dropzone from 'react-dropzone'
// @ts-ignore
import { Button, ButtonStyles } from '../../../components/Button/index.tsx'
import classes from './PhotoForm.module.scss'

type PhotoFormPropsType = {
  onSubmitPhoto: (file: File) => void,
  avatarUrl: string
}

const PhotoForm: React.FC<PhotoFormPropsType> = ({ avatarUrl, onSubmitPhoto }) => {
  const { t } = useTranslation()

  const inputPhoto = useRef<HTMLInputElement>(null)

  const onBtnClickLoadPhoto = () => {
    if (inputPhoto && inputPhoto.current) {
      inputPhoto.current.click()
    }
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onSubmitPhoto(e.target.files[0])
    }
  }

  const onMainPhotoDropped = (files: any) => {
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
          stylish={ButtonStyles.Primary}
        />
      </div>
    </div>
  )
}

export default PhotoForm
