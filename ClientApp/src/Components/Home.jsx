import React, { Component } from 'react'
import Blob from './Games/Blob/Blob'
import Snake from './Games/Snake/Snake'
import Piano from './Games/Piano/Piano'
import Spring from './Games/Spring/Spring'
import './home.css'
import { rootCertificates } from 'tls'

export default class Home extends Component {
    state = {
        blobListen: false,
        snakeListen: false,
        game1: 1,
        game2: 4,
    }
    games = [ 1, 2, 3, 4]

    gameHandler = (game) => {
        if(this.state.game1 === game || this.state.game2 === game)
            {
                return true
            } else {
                return false
            }
    }


    handleClose = (gameId) => {

        let newGameOptions = this.games.filter(g => g !== this.state.game1 && g !== this.state.game2)
        let newGame = newGameOptions[Math.floor(Math.random()*newGameOptions.length)] 
        if(this.state.game1 === gameId){
            this.setState({game1: newGame})
        }else {
            this.setState({game2: newGame})
        }
    }


    render() {
        return (
            <>
                <div className="gameContainer">
            {this.gameHandler(1) ? 
                    <div className="game g1">
                        <div className="buttonContainer">
                            <wired-icon-button id="btn2" class="close1" onClick={() => this.handleClose(1)}>close</wired-icon-button>
                            <wired-icon-button id="btn1">favorite</wired-icon-button>
                        </div>
                        <wired-card elevation="3"
                            onMouseEnter={() => this.setState({blobListen: true})} 
                            onMouseLeave={() => this.setState({blobListen: false})}> 
                                <Blob listening={this.state.blobListen}/>
                        </wired-card>
                    </div> 
            : null} 
            {this.gameHandler(2) ? 
                    <div className="game g2">
                        <div className="buttonContainer">
                            <wired-icon-button id="btn2" class="close2" onClick={() => this.handleClose(2)}>close</wired-icon-button>
                            <wired-icon-button id="btn1">favorite</wired-icon-button>
                        </div>
                        <wired-card elevation="3"
                            onMouseEnter={() => this.setState({snakeListen: true})} 
                            onMouseLeave={() => this.setState({snakeListen: false})}>
                                <Snake listening={this.state.snakeListen}/>
                        </wired-card>
                    </div>
            : null}
            {this.gameHandler(3) ? 
                    <div className="game g3">
                        <div className="buttonContainer">
                            <wired-icon-button id="btn2" class="close3" onClick={() => this.handleClose(3)}>close</wired-icon-button>
                            <wired-icon-button id="btn1">favorite</wired-icon-button>
                        </div>
                        <wired-card elevation="3">
                            <Piano />
                        </wired-card>
                    </div>
            : null}
            {this.gameHandler(4) ? 
                    <div className="game g4">
                        <div className="buttonContainer">
                            <wired-icon-button id="btn2" class="close4" onClick={() => this.handleClose(4)}>close</wired-icon-button>
                            <wired-icon-button id="btn1">favorite</wired-icon-button>
                        </div>
                        <wired-card elevation="3">
                                <Spring />
                        </wired-card>
                    </div>
            : null}
                </div>
            </>
        )
    }
}
