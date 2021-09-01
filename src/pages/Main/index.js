import React from 'react'
import { useTranslation } from 'react-i18next'
import MainContainer from '../../hoc/MainContainer'

const Main = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }
  return (
    <MainContainer>
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('ru')}>RU</button>
      <hr />
      <div>
        <h1>{t('main.title')}</h1>
      </div>
      <div>{t('main.description.part1')}</div>
      <div>{t('main.description.part2')}</div>
    </MainContainer>
  )
}

export default Main
