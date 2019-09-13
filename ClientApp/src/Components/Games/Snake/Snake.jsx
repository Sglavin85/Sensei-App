import React from 'react'
import { useTrail, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './snake.css'

export default function App() {
    const [springs, set] = useTrail(40, () => ({
        x: 0,
        y: 0,
        config: config.stiff
    }))

    const bind = useDrag(({ offset: [x, y], velocity }) => {
        set(i => ({
            x: !i ? x : springs[i - 1].x.getValue(),
            y: !i ? y : springs[i - 1].y.getValue()
        }))
    })
    
    return springs.map((props, index) =>
    index === 0 ? (
        <animated.div {...bind()} key={index} style={props} />
        ) : (
            <animated.div key={index} style={props} />
            )
            )
        }