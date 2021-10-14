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

  const itemLength = 266 // item width + margin left & right
  const { length } = items
  let shift = 3
  let visibleGroup = 6

  if (windowWidth.width < 1830) {
    visibleGroup = 5
  }

  if (windowWidth.width < 1564) {
    visibleGroup = 4
  }

  if (windowWidth.width < 1298) {
    visibleGroup = 3
  }

  if (windowWidth.width < 1032) {
    visibleGroup = 2
    shift = 2
  }

  if (windowWidth.width < 766) {
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

  const prevStyle = () => {
    if (position === 0) {
      return cn(classes.Btn, classes.Prev, classes.Disable)
    }
    return cn(classes.Btn, classes.Prev)
  }

  const nextStyle = () => {
    if (position === lastPosition) {
      return cn(classes.Btn, classes.Next, classes.Disable)
    }
    return cn(classes.Btn, classes.Next)
  }

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
        <div
          className={prevStyle}
          onClick={prevHandler}
          onKeyPress={prevHandler}
          role="link"
          tabIndex={0}
        >
          {'<'}
        </div>
        <div
          className={nextStyle}
          onClick={nextHandler}
          onKeyPress={nextHandler}
          role="link"
          tabIndex={0}
        >
          {'>'}
        </div>
      </div>
      <PhotoSession />
    </div>
  )
}

export default Slider
