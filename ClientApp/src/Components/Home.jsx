import React, { Component } from 'react'
import {Row, Col} from 'antd'
import Blob from './Games/Blob/Blob'
import Snake from './Games/Snake/Snake'
import Cards from './Games/Cards/Cards'
import './home.css'

export default class Home extends Component {
    state = {
        blobListen: false,
        snakeListen: false
    }


    render() {
        return (
            <>
                    <div className="gameContainer">
                <div className="game g1">
                    <div className="buttonContainer">
                        <wired-icon-button id="btn2" class="red">close</wired-icon-button>
                        <wired-icon-button id="btn1">favorite</wired-icon-button>
                    </div>
                    <wired-card elevation="3"
                        onMouseEnter={() => this.setState({blobListen: true})} 
                        onMouseLeave={() => this.setState({blobListen: false})}> 
                            <Blob listening={this.state.blobListen}/>
                    </wired-card>
                </div>

                <div className="game g2">
                    <div className="buttonContainer">
                        <wired-icon-button id="btn2" class="red">close</wired-icon-button>
                        <wired-icon-button id="btn1">favorite</wired-icon-button>
                    </div>
                    <wired-card elevation="3"
                        onMouseEnter={() => this.setState({snakeListen: true})} 
                        onMouseLeave={() => this.setState({snakeListen: false})}>
                            <Snake listening={this.state.snakeListen}/>
                    </wired-card>
                </div>
                </div>
            </>
        )
    }
}
