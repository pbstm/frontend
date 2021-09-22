import React, { useRef, useState, useEffect } from 'react'
import cn from 'classnames'
import classes from './Slider.module.scss'
import { items } from './SliderData'

const Slider = () => {
  const slider = useRef(null)
  const [position, setPosition] = useState(0)

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
  const shift = 3
  const visibleGroup = 6

  const itemsShift = itemLength * shift
  const extremeItems = length % shift
  const arrayWithoutExtreme = length - extremeItems
  const extremeShift = itemLength * extremeItems

  const lastPosition = -(length - visibleGroup) * itemLength
  // 1 2 3 4 5 6 7 8 9 10 [11 12 13 14 15 16]

  const lastPosBeforeExtreme = -(arrayWithoutExtreme - visibleGroup) * itemLength
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

  return (
    <div className={classes.Slider}>
      <div className={classes.Track} ref={slider}>
        {items.map((item) => (
          <div className={classes.Item} key={item}>
            {item}
          </div>
        ))}
      </div>
      <div
        className={
          position === 0 ?
            cn(classes.Btn, classes.Prev, classes.Disable) :
            cn(classes.Btn, classes.Prev)
        }
        onClick={prevHandler}
        onKeyPress={prevHandler}
        role="link"
        tabIndex={0}
      >
        {'<'}
      </div>
      <div
        className={
          position === lastPosition ?
            cn(classes.Btn, classes.Next, classes.Disable) :
            cn(classes.Btn, classes.Next)
        }
        onClick={nextHandler}
        onKeyPress={nextHandler}
        role="link"
        tabIndex={0}
      >
        {'>'}
      </div>
    </div>
  )
}

export default Slider
