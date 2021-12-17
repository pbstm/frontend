import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { compose } from 'redux'
import ProfileContainer from '../../hoc/ProfileContainer'
// @ts-ignore
import { getAccessToken } from '../../const/const.ts'
// prettier-ignore
// @ts-ignore
import { updateNameData, updateEmailData, updatePasswordData, updatePhotoData } from '../../redux/changeProfileReducer.ts'
// prettier-ignore
import { selectName, selectEmail, selectAvatarUrl } from '../../redux/authSelectors'
// prettier-ignore
import { selectChangePasswordError, selectChangePasswordSuccess, selectChangeEmailError, selectChangeEmailSuccess } from '../../redux/changeProfileSelectors'
import NameForm from './NameForm'
import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'
import PhotoForm from './PhotoForm'
import classes from './Profile.module.scss'

const Profile = () => {
  const token = getAccessToken()
  const userName = useSelector(selectName)
  const userEmail = useSelector(selectEmail)
  const avatarUrl = useSelector(selectAvatarUrl)
  const changePasswordError = useSelector(selectChangePasswordError)
  const changePasswordSuccess = useSelector(selectChangePasswordSuccess)
  const changeEmailError = useSelector(selectChangeEmailError)
  const changeEmailSuccess = useSelector(selectChangeEmailSuccess)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      window.location.replace('./login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmitPhoto = (file) => {
    dispatch(updatePhotoData(file))
  }

  const onSubmitName = (name) => {
    dispatch(updateNameData(name))
  }

  const onSubmitEmail = (values) => {
    dispatch(updateEmailData(values.email, values.password))
  }

  const onSubmitPassword = (values) => {
    dispatch(
      updatePasswordData(
        values.current_password,
        values.password,
        values.password_confirmation
      )
    )
  }

  return (
    <ProfileContainer>
      <div className={classes.Container}>
        <PhotoForm avatarUrl={avatarUrl} onSubmitPhoto={onSubmitPhoto} />
        <div>
          <NameForm onSubmitName={onSubmitName} userName={userName} />
          <EmailForm
            onSubmitEmail={onSubmitEmail}
            userEmail={userEmail}
            changeEmailError={changeEmailError}
            changeEmailSuccess={changeEmailSuccess}
          />
          <PasswordForm
            onSubmit={onSubmitPassword}
            changePasswordError={changePasswordError}
            changePasswordSuccess={changePasswordSuccess}
          />
        </div>
      </div>
    </ProfileContainer>
  )
}

export default compose(withRouter)(Profile)
