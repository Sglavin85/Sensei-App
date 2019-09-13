import React, { Component } from 'react'
import {Row, Col} from 'antd'
import Blob from './Games/Blob/Blob'
import Snake from './Games/Snake/Snake'
import Cards from './Games/Cards/Cards'
import './home.css'

export default class Home extends Component {
    state = {
        blobListen: false
    }


    render() {
        return (
            <>
                <div className="box" 
                onMouseEnter={() => this.setState({blobListen: true})} 
                onMouseLeave={() => this.setState({blobListen: false})}>
                            <Blob listening={this.state.blobListen}/>
                </div>
            </>
        )
    }
}
