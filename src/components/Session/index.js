import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import SessionSlider from './SessionSlider/SessionSlider'

const Session = ({ onClose, id }) => {
  const { t } = useTranslation()
  return (
    <>
      <div>
        {t('cabinet.sessions.forms.titles.formTitle')}
        {id}
      </div>
      <SessionSlider />
      <div onClick={onClose} onKeyPress={onClose} role="link" tabIndex={0}>
        Close
      </div>
    </>
  )
}

export default Session

Session.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}
