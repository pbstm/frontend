import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { compose } from 'redux'
// import { change } from 'redux-form'
import ProfileContainer from '../../hoc/ProfileContainer'
import { getAccessToken } from '../../const/const'
// prettier-ignore
import { updateNameData, updateEmailData, updatePasswordData, updatePhotoData } from '../../redux/changeProfileReducer'
// prettier-ignore
import { selectName, selectEmail, selectAvatarUrl } from '../../redux/authSelectors'
import { selectChangePasswordError, selectChangePasswordSuccess, selectChangeEmailSuccess } from '../../redux/changeProfileSelectors'
import NameForm from './NameForm'
import EmailReduxForm from './EmailForm'
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

  const onSubmitEmail = (formData) => {
    dispatch(updateEmailData(formData.email, formData.current_password))
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
          <EmailReduxForm
            onSubmit={onSubmitEmail}
            userEmail={userEmail}
            changeEmailSuccess={changeEmailSuccess}
            initialValues={{
              email: `${userEmail}`
            }}
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
