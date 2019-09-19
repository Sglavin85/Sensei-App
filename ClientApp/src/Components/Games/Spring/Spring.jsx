import { render } from 'react-dom'
import React from 'react'
import clamp from 'lodash-es/clamp'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import {Howl, Howler} from 'howler'
import './spring.css'

export default function Spring() {

 const boing = new Howl ({
    src: "http://sfxcontent.s3.amazonaws.com/soundfx/Spring-Boing.mp3",
    preload: true,
    volume: 0.5
})
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  const bind = useDrag(({ down, delta, velocity }) => {
    velocity = clamp(velocity, 10, 25)
    set({ xy: down ? delta : [0, 0], config: { mass: 40 * velocity, tension: 1500 * velocity, friction: 100 } })
  })
  return (
  <div className="spring"  onMouseUp={() => boing.play()}>
      <animated.div {...bind()} style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }} />
  </div>
  )
}
