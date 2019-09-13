import React, { Component } from 'react'
import {Row, Col} from 'antd'
import Blob from './Games/Blob/Blob'
import Snake from './Games/Snake/Snake'
import Cards from './Games/Cards/Cards'
import './home.css'

export default class Home extends Component {
    render() {
        return (
            <>
                            <Blob />
                <div className="gameContainer">
                        <div className="hook box">
                        </div>
                        {/* <div className="snake box">
                            <Snake />
                        </div> */}
                </div>
            </>
        )
    }
}
