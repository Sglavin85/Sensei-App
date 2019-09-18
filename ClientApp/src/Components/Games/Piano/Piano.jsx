import React from 'react'
import { useSpring, animated } from 'react-spring'
import {Howl, Howler} from 'howler'
import './piano.css'


const interp = i => r => `translate3d(0, ${50 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`

const sound1 = new Howl({
    src: 'audio/1f.mp3',
    preload: true,
    volume: 0.5
})

const sound2 = new Howl({
    src: 'audio/2a.mp3',
    preload: true,
    volume: 0.5
})

const sound3 = new Howl({
    src: 'audio/3b.mp3',
    preload: true,
    volume: 0.5
})

const sound4 = new Howl({
    src: 'audio/4d.mp3',
    preload: true,
    volume: 0.5
})

export default function Piano(props) {
  const { radians } = useSpring({
    to: { radians: 4900 * Math.PI },
    from: { radians: 0 },
    config: { duration: 10000000 },
    reset: true,
  })
  return <div className="piano">
      <animated.div key={0} onMouseEnter={() => sound1.play()} className="script-bf-box" style={{ transform: radians.interpolate(interp(0)) }} />
      <animated.div key={1} onMouseEnter={() => sound2.play()} className="script-bf-box" style={{ transform: radians.interpolate(interp(1)) }} />
      <animated.div key={2} onMouseEnter={() => sound3.play()} className="script-bf-box" style={{ transform: radians.interpolate(interp(2)) }}/>
      <animated.div key={3} onMouseEnter={() => sound4.play()} className="script-bf-box" style={{ transform: radians.interpolate(interp(3)) }}/>
        </div>
}