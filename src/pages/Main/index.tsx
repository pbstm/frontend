import React from 'react'
import { useTranslation } from 'react-i18next'
// @ts-ignore
import MainContainer from '../../hoc/MainContainer.tsx'

const Main: React.FC = () => {
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
