import React from 'react'
import { useTrail, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './snake.css'

export default function App(props) {
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
    
    return <div className="snake">
        {springs.map((styles, index) =>
    index === 0 ? (
        props.listening ? <animated.div {...bind()} key={index} style={styles} /> : <animated.div key={index} style={styles} /> 
        ) : (
            <animated.div key={index} style={styles} />
            )
            )
        }
            </div>
}