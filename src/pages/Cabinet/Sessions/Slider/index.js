import React, { useRef, useState, useEffect } from 'react'
import cn from 'classnames'
import classes from './Slider.module.scss'
import { items } from './SliderData'
import WindowDimensions from '../../../../utils/windowDimensions'
import Session from '../../../../components/Session'

const Slider = () => {
  const slider = useRef(null)
  const [position, setPosition] = useState(0)
  const windowWidth = WindowDimensions()
  const [activeSlide, setActiveSlide] = useState()
  const [sessionMode, setSessionMode] = useState(false)

  const closeSession = () => {
    setSessionMode(false)
  }

  const translateSlides = () => {
    slider.current.childNodes.forEach((element) => {
      element.style = `transform: translateX(${position}px)`
    })
  }

  useEffect(() => {
    translateSlides()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position])

  const sliderMargins = 234 // margins slider left + right
  const itemLength = 266 // item width + margin left & right
  const maxVisibleGroup = 6
  const maxShift = 3
  const { length } = items
  let shift = maxShift
  let visibleGroup = maxVisibleGroup

  if (windowWidth.width < 6 * itemLength + sliderMargins) {
    visibleGroup = 5
  }

  if (windowWidth.width < 5 * itemLength + sliderMargins) {
    visibleGroup = 4
  }

  if (windowWidth.width < 4 * itemLength + sliderMargins) {
    visibleGroup = 3
  }

  if (windowWidth.width < 3 * itemLength + sliderMargins) {
    visibleGroup = 2
    shift = 2
  }

  if (windowWidth.width < 2 * itemLength + sliderMargins) {
    visibleGroup = 1
    shift = 1
  }

  const itemsShift = itemLength * shift
  const extremeItems = (length - visibleGroup) % shift
  const arrayWithoutExtreme = length - extremeItems
  const extremeShift = itemLength * extremeItems

  const lastPosition = -(length - visibleGroup) * itemLength
  // 1 2 3 4 5 6 7 8 9 10 [11 12 13 14 15 16]

  const lastPosBeforeExtreme =
    -(arrayWithoutExtreme - visibleGroup) * itemLength
  // 1 2 3 4 5 6 7 8 9 [10 11 12 13 14 15] 16

  const firstPosBeforeExtreme = -extremeItems * itemLength
  // 1 [2 3 4 5 6 7] 8 9 10 11 12 13 14 15 16

  // position = 0:
  // [1 2 3 4 5 6] 7 8 9 10 11 12 13 14 15 16

  const prevHandler = () => {
    if (position === 0 || position > 0) {
      return
    }
    if (position === firstPosBeforeExtreme) {
      setPosition(0)
    } else {
      setPosition(position + itemsShift)
    }
  }

  const nextHandler = () => {
    if (position === lastPosition || position < lastPosition) {
      return
    }
    if (position === lastPosBeforeExtreme) {
      setPosition(position - extremeShift)
    } else {
      setPosition(position - itemsShift)
    }
  }

  const slideHandler = (item) => {
    setActiveSlide(item)
    setSessionMode(true)
  }

  const PhotoSession = () => {
    if (sessionMode) {
      return (
        <div className={classes.Session}>
          <Session onClose={closeSession} id={activeSlide} />
        </div>
      )
    }
    return null
  }

  const prevClass = (
    position === 0 ?
      cn(classes.Btn, classes.Prev, classes.Disable) :
      cn(classes.Btn, classes.Prev)
  )

  const nextClass = (
    position === lastPosition ?
      cn(classes.Btn, classes.Next, classes.Disable) :
      cn(classes.Btn, classes.Next)
  )

  const PrevBtn = (
    <div
      className={prevClass}
      onClick={prevHandler}
      onKeyPress={prevHandler}
      role="link"
      tabIndex={0}
    >
      {'<'}
    </div>
  )

  const NextBtn = (
    <div
      className={nextClass}
      onClick={nextHandler}
      onKeyPress={nextHandler}
      role="link"
      tabIndex={0}
    >
      {'>'}
    </div>
  )

  return (
    <div className={classes.Container}>
      <div className={classes.Slider}>
        <div className={classes.Track} ref={slider}>
          {items.map((item) => (
            <div
              className={classes.Item}
              key={item}
              onClick={() => slideHandler(item)}
              onKeyPress={() => slideHandler(item)}
              role="link"
              tabIndex={0}
            >
              <div>{item}</div>
            </div>
          ))}
        </div>
        {PrevBtn}
        {NextBtn}
      </div>
      <PhotoSession />
    </div>
  )
}

export default Slider
