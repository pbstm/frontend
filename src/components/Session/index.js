import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const Session = ({ onClose, id }) => {
  const { t } = useTranslation()
  return (
    <>
      <div>
        {t('cabinet.sessions.forms.titles.formTitle')}
        {id}
      </div>
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
