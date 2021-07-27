import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { compose } from 'redux'
import ProfileContainer from '../../hoc/ProfileContainer'
import { getAccessToken } from '../../const/const'
// prettier-ignore
import { updateNameData, updateEmailData, updatePasswordData, updatePhotoData } from '../../redux/changeProfileReducer'
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

  const onSubmitName = (formData) => {
    if (userName !== formData.target.value) {
      dispatch(updateNameData(formData.target.value))
    }
  }

  const onSubmitEmail = (event) => {
    event.preventDefault()
    dispatch(updateEmailData(event.target[0].value, event.target[1].value))
  }

  const onSubmitPassword = (values, { setSubmitting, resetForm }) => {
    dispatch(
      updatePasswordData(
        values.current_password,
        values.password,
        values.password_confirmation,
        setSubmitting,
        resetForm
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