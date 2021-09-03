import React from 'react'
import { useTranslation } from 'react-i18next'
import MainContainer from '../../hoc/MainContainer'

const Main = () => {
  const { t } = useTranslation()

  return (
    <MainContainer>
      <div>
        <h1>{t('main.title')}</h1>
      </div>
      <div>{t('main.description.part1')}</div>
      <div>{t('main.description.part2')}</div>
    </MainContainer>
  )
}

export default Main
