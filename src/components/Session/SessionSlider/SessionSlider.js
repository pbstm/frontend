import React, { useState } from 'react'
import cn from 'classnames'
import classes from './SessionSlider.module.scss'
import { img } from './SessionSliderData'

const SessionSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animation, setAnimation] = useState(0) // flag to disable buttons & divs during animation

  const setActiveIndexTimeout = (index) => {
    setTimeout(() => {
      setActiveIndex(index)
    }, 490) // slightly slower than animation speed
  }

  const setAnimationTimeout = () => {
    setTimeout(() => {
      setAnimation(0)
    }, 500) // equal to animation speed
  }

  const setAnimationDoubleTimeout = () => {
    setTimeout(() => {
      setAnimation(0)
    }, 1000) // equal to 2x animation speed
  }

  const nextHandler = () => {
    setAnimation(1)
    setActiveIndex((current) => {
      const res = current === img.length - 1 ? 0 : current + 1
      return res
    })
    setAnimationTimeout()
  }

  const prevHandler = () => {
    setAnimation(1)
    setActiveIndex((current) => {
      const res = current === 0 ? img.length - 1 : current - 1
      return res
    })
    setAnimationTimeout()
  }

  const prevImgIndex = activeIndex === 0 ? img.length - 1 : activeIndex - 1
  const prev2ImgIndex = prevImgIndex === 0 ? img.length - 1 : prevImgIndex - 1
  const prev3ImgIndex = prev2ImgIndex === 0 ? img.length - 1 : prev2ImgIndex - 1

  const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1
  const next2ImgIndex = nextImgIndex === img.length - 1 ? 0 : nextImgIndex + 1
  const next3ImgIndex = next2ImgIndex === img.length - 1 ? 0 : next2ImgIndex + 1

  const clickHandler = (index) => {
    // if the indices are adjacent then immediately switch
    if (
      activeIndex - index === 1 || // [0] [1] 2  normal downward
      index - activeIndex === 1 || // 0 [1] [2]  normal to increase
      (activeIndex === img.length - 1 && index === 0) || // 7 [8] [0]  extreme
      (index === img.length - 1 && activeIndex === 0) // [8] [0] 1  extreme
    ) {
      setAnimation(1)
      setActiveIndex(index)
      setAnimationTimeout()
    }
    // if the indices are after one, then switch first to the index between them
    if (activeIndex - index === 2) {
      // [0] 1 [2] 3 4 normal downward
      setAnimation(1)
      setActiveIndex(activeIndex - 1)
      setActiveIndexTimeout(index)
      setAnimationDoubleTimeout()
    }

    if (index - activeIndex === 2) {
      // 0 1 [2] 3 [4] normal to increase
      setAnimation(1)
      setActiveIndex(activeIndex + 1)
      setActiveIndexTimeout(index)
      setAnimationDoubleTimeout()
    }

    if (
      (index === img.length - 1 && activeIndex === 1) || // [8] 0 [1] 2 3 extreme
      (index === 1 && activeIndex === img.length - 1) // 6 7 [8] 0 [1] extreme
    ) {
      setAnimation(1)
      setActiveIndex(0)
      setActiveIndexTimeout(index)
      setAnimationDoubleTimeout()
    }

    if (
      (index === img.length - 2 && activeIndex === 0) || // [7] 8 [0] 1 2 extreme
      (index === 0 && activeIndex === img.length - 2) // 5 6 [7] 8 [0] extreme
    ) {
      setAnimation(1)
      setActiveIndex(img.length - 1)
      setActiveIndexTimeout(index)
      setAnimationDoubleTimeout()
    }
  }

  const PrevBtn = (
    <button
      className={cn(classes.Btn, classes.Prev)}
      onClick={prevHandler}
      disabled={animation}
    >
      {'<'}
    </button>
  )

  const NextBtn = (
    <button
      className={cn(classes.Btn, classes.Next)}
      onClick={nextHandler}
      disabled={animation}
    >
      {'>'}
    </button>
  )

  const prev2Class =
    animation === 1 ?
      cn(classes.Img, classes.ImgPrev2, classes.NoClick) :
      cn(classes.Img, classes.ImgPrev2)

  const prevClass =
    animation === 1 ?
      cn(classes.Img, classes.ImgPrev, classes.NoClick) :
      cn(classes.Img, classes.ImgPrev)

  const midClass =
    animation === 1 ? cn(classes.Img, classes.NoClick) : classes.Img

  const nextClass =
    animation === 1 ?
      cn(classes.Img, classes.ImgNext, classes.NoClick) :
      cn(classes.Img, classes.ImgNext)

  const next2Class =
    animation === 1 ?
      cn(classes.Img, classes.ImgNext2, classes.NoClick) :
      cn(classes.Img, classes.ImgNext2)

  return (
    <div className={classes.SlidersContainer}>
      <div className={classes.SliderSoloContainer}>
        <div className={classes.SliderSolo}>
          <div
            className={cn(classes.ImgSolo, classes.ImgSoloPrev)}
            key={prevImgIndex}
          >
            {img[prevImgIndex]}
          </div>
          <div className={classes.ImgSolo} key={activeIndex}>
            {img[activeIndex]}
          </div>
          <div
            className={cn(classes.ImgSolo, classes.ImgSoloNext)}
            key={nextImgIndex}
          >
            {img[nextImgIndex]}
          </div>
        </div>
        {PrevBtn}
        {NextBtn}
      </div>

      <div className={classes.Slider}>
        <div className={cn(classes.Img, classes.ImgPrev3)} key={prev3ImgIndex}>
          {img[prev3ImgIndex]}
        </div>
        <div
          className={prev2Class}
          key={prev2ImgIndex}
          onClick={() => clickHandler(prev2ImgIndex)}
          onKeyPress={() => clickHandler(prev2ImgIndex)}
          role="link"
          tabIndex={0}
        >
          {img[prev2ImgIndex]}
        </div>
        <div
          className={prevClass}
          key={prevImgIndex}
          onClick={() => clickHandler(prevImgIndex)}
          onKeyPress={() => clickHandler(prevImgIndex)}
          role="link"
          tabIndex={0}
        >
          {img[prevImgIndex]}
        </div>
        <div
          className={midClass}
          key={activeIndex}
          onClick={() => clickHandler(activeIndex)}
          onKeyPress={() => clickHandler(activeIndex)}
          role="link"
          tabIndex={0}
        >
          {img[activeIndex]}
        </div>
        <div
          className={nextClass}
          key={nextImgIndex}
          onClick={() => clickHandler(nextImgIndex)}
          onKeyPress={() => clickHandler(nextImgIndex)}
          role="link"
          tabIndex={0}
        >
          {img[nextImgIndex]}
        </div>
        <div
          className={next2Class}
          key={next2ImgIndex}
          onClick={() => clickHandler(next2ImgIndex)}
          onKeyPress={() => clickHandler(next2ImgIndex)}
          role="link"
          tabIndex={0}
        >
          {img[next2ImgIndex]}
        </div>
        <div className={cn(classes.Img, classes.ImgNext3)} key={next3ImgIndex}>
          {img[next3ImgIndex]}
        </div>
      </div>
    </div>
  )
}

export default SessionSlider
