import React, { Component } from 'react'
import Blob from './Games/Blob/Blob'
import Snake from './Games/Snake/Snake'
import Piano from './Games/Piano/Piano'
import Spring from './Games/Spring/Spring'
import API from './Dependents/DependentManager'
import './home.css'


export default class Home extends Component {
      constructor(props) {
        super(props);
        this.game1Ref = React.createRef();
        this.game2Ref = React.createRef();
        this.game3Ref = React.createRef();
        this.game4Ref = React.createRef();
        if(props.currentPlayer.games != undefined && props.currentPlayer.games.length > 1 ){
            var results = props.currentPlayer.games.sort(function() { return .5 - Math.random() }).slice(0, 2);
            this.state = {
                blobListen: false,
                snakeListen: false,
                game1: results[0],
                game2: results[1],
            }
        }else if(props.currentPlayer.games != undefined && props.currentPlayer.games.length === 1 ){
            const gamesArray = [ 1, 2, 3, 4]
            gamesArray.splice(props.currentPlayer.games[0].id - 1, 1)
            this.state = {
                blobListen: false,
                snakeListen: false,
                game1: props.currentPlayer.games[0],
                game2: gamesArray[Math.floor(Math.random()*gamesArray.length)],
            }
        }else {
            const gamesArray = [ 1, 2, 3, 4]
            var results = gamesArray.sort(function() { return .5 - Math.random() }).slice(0, 2);
            this.state = {
                blobListen: false,
                snakeListen: false,
                game1: results[0],
                game2: results[1],
            }
        }
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

    toggleFavClass = (gameId) => {
        if(gameId === 1){
            this.game1Ref.current.classList.toggle("liked");
        }else if(gameId === 2){
            this.game2Ref.current.classList.toggle("Liked");
        }else if(gameId === 3){
            this.game3Ref.current.classList.toggle("Liked");
        }else if(gameId === 4){
            this.game4Ref.current.classList.toggle("Liked");
        }
    }

    handleFavorite = (gameId) => {
        const alreadyFavorite = this.props.currentPlayer.games.find(g => g.gameId === gameId)
        const token = JSON.parse(sessionStorage.getItem("Token"))
        if(alreadyFavorite === undefined){
            API.addFavorite(gameId, this.props.currentPlayer.id, token)
                .then(response => this.props.addFavorite(response))
        }else{
            API.deleteFavorite(alreadyFavorite.id, token)
                .then(response => this.props.removeFavorite(response.id))
        }
        this.toggleFavClass(gameId)
    }


    render() {
        return (
            <>
                <div className="gameContainer">
            {this.gameHandler(1) ? 
                    <div className="game g1">
                        <div className="buttonContainer">
                            <wired-icon-button id="g1btn2" class="close1" onClick={() => this.handleClose(1)}>close</wired-icon-button>
                            <wired-icon-button ref={this.game1Ref} id="g1btn1"  onClick={() => this.handleFavorite(1)}>favorite</wired-icon-button>
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
                            <wired-icon-button id="g2btn2" class="close2" onClick={() => this.handleClose(2)}>close</wired-icon-button>
                            <wired-icon-button ref={this.game2Ref} id="g2btn1" onClick={() => this.handleFavorite(2)}>favorite</wired-icon-button>
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
                            <wired-icon-button id="g3btn2" class="close3" onClick={() => this.handleClose(3)}>close</wired-icon-button>
                            <wired-icon-button ref={this.game3Ref} id="g3btn1" onClick={() => this.handleFavorite(3)}>favorite</wired-icon-button>
                        </div>
                        <wired-card elevation="3">
                            <Piano />
                        </wired-card>
                    </div>
            : null}
            {this.gameHandler(4) ? 
                    <div className="game g4">
                        <div className="buttonContainer">
                            <wired-icon-button id="g4btn2" class="close4" onClick={() => this.handleClose(4)}>close</wired-icon-button>
                            <wired-icon-button ref={this.game4Ref} id="g4btn1" onClick={() => this.handleFavorite(4)}>favorite</wired-icon-button>
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
