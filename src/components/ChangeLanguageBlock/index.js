import React, { useState } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import classes from './ChangeLanguageBlock.module.scss'

const ChangeLanguageBlock = () => {
  const { i18n } = useTranslation()
  const [isMenuOpen, toggleMenu] = useState(false)
  const [lang, setLang] = useState(localStorage.i18nextLng)

  function toggleMenuMode() {
    toggleMenu(!isMenuOpen)
  }

  function closeMenuMode() {
    toggleMenu(false)
  }

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
    setLang(language)
  }

  return (
    <div className={classes.LangBlock}>
      <div
        className={classNames(classes.Dropdown, isMenuOpen ? classes.Open : '')}
        onClick={toggleMenuMode}
        onKeyPress={toggleMenuMode}
        role="link"
        tabIndex={0}
      >
        <div>{lang}</div>
        <ul>
          <li>
            <div
              onClick={() => changeLanguage('en')}
              onKeyPress={() => changeLanguage('en')}
              role="link"
              tabIndex={0}
            >
              en
            </div>
          </li>
          <li>
            <div
              onClick={() => changeLanguage('ru')}
              onKeyPress={() => changeLanguage('ru')}
              role="link"
              tabIndex={0}
            >
              ru
            </div>
          </li>
        </ul>
      </div>
      {isMenuOpen ? (
        <div
          className={classes.Backdrop}
          onClick={closeMenuMode}
          onKeyPress={closeMenuMode}
          role="link"
          tabIndex={0}
        >
          .
        </div>
      ) : null}
    </div>
  )
}

export default ChangeLanguageBlock
