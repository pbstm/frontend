import React from 'react'
import PropTypes from 'prop-types'

const Session = ({ onClose, id }) => {
  console.log('session ', id)
  return (
    <div>
      <div>
        Photo session
        {id}
      </div>
      <div onClick={onClose} onKeyPress={onClose} role="link" tabIndex={0}>
        Close
      </div>
    </div>
  )
}

export default Session

Session.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}
