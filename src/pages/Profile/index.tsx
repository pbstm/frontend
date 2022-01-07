import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { compose } from 'redux'
// @ts-ignore
import { getAccessToken } from '../../const/const.ts'
// @ts-ignore
import ProfileContainer from '../../hoc/ProfileContainer.tsx'
// prettier-ignore
// @ts-ignore
import { updateNameData, updateEmailData, updatePasswordData, updatePhotoData } from '../../redux/changeProfileReducer.ts'
// prettier-ignore
import { selectName, selectEmail, selectAvatarUrl } from '../../redux/authSelectors'
// prettier-ignore
import { selectChangePasswordError, selectChangePasswordSuccess, selectChangeEmailError, selectChangeEmailSuccess } from '../../redux/changeProfileSelectors'
// @ts-ignore
import NameForm from './NameForm/index.tsx'
// @ts-ignore
import EmailForm, { EmailFormValuesType } from './EmailForm/index.tsx'
// @ts-ignore
import PasswordForm, { PasswordFormValuesType } from './PasswordForm/index.tsx'
// @ts-ignore
import PhotoForm from './PhotoForm/index.tsx'
import classes from './Profile.module.scss'

const Profile: React.FC = () => {
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

  const onSubmitPhoto = (file: File) => {
    dispatch(updatePhotoData(file))
  }

  const onSubmitName = (name: string) => {
    dispatch(updateNameData(name))
  }

  const onSubmitEmail = (values: EmailFormValuesType) => {
    dispatch(updateEmailData(values.email, values.password))
  }

  const onSubmitPassword = (values: PasswordFormValuesType) => {
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
