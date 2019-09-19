import React, { Component } from 'react';
import { withRouter } from 'react-router'
import './App.css';
import Navbar from './Components/Nav/Navbar'
import Login from './Auth/Login';
import Register from './Auth/Register';
import Home from './Components/Home';
import Depedents from './Components/Dependents/Dependents';
import { Layout } from 'antd';
import { Route, Redirect } from 'react-router-dom';
import API from './Auth/UserManager';
import DependentAPI from './Components/Dependents/DependentManager'
import Decoder from 'jwt-decode';


const { Header, Content, Footer } = Layout

class Sensei extends Component {
  

    state = {
        userId: "",
        dependents: [],
        currentPlayer: {}
    }

    setTheme = () => {
        console.log(this.state.currentPlayer.favoriteColor)
        let root = document.documentElement;
        root.style.setProperty("--fav-color", `#${this.state.currentPlayer.favoriteColor}`)

    }

    updateCurrentPlayer = (id) => {
        
        const newPlayer = this.state.dependents.find(p => p.id === parseInt(id))
        this.setState({currentPlayer: newPlayer})
    }

    isAuthenticated = () => sessionStorage.getItem("Token") !== null;

    componentDidMount() {
        if(!!this.isAuthenticated()){
            const token = JSON.parse(sessionStorage.getItem("Token"))
            const decocededToken = Decoder(token.token)
            DependentAPI.getAllDependents(token.token)
            .then(response => {
                const parsedDependents = Object.values(response)

                if(parsedDependents.length > 0){
                    this.setState({dependents: parsedDependents, userId: decocededToken.email, currentPlayer: parsedDependents[0]}, () => {this.setTheme()})            
                }else{
                    this.setState({dependents: parsedDependents, userId: decocededToken.email})  
                }
            })
        }
    }

    componentDidUpdate() {
        this.setTheme()
    }

    login = (user) => {
        API.login(user)
        .then(response => {            
            if(response.token !== undefined)
            {               
                const token = JSON.stringify(response)
                sessionStorage.setItem("Token", token)
                const decocededToken = Decoder(response.token)
                DependentAPI.getAllDependents(response.token)
                .then(response => {
                    const parsedDependents = Object.values(response)
                    this.setState({dependents: parsedDependents, userId: decocededToken.email, currentPlayer: parsedDependents[0]}, () => {this.setTheme()})
                })
            }
        })
        .then(_response => {
            this.props.history.push('/home')
        })
    }

    register = (user) => {
        API.register(user)
        .then(_response => {
            this.login(user)
        })
    }
    
    logout = () => {
        this.setState({userIsLoggedIn: false})
        sessionStorage.clear()
    }

    updateState = (stateToUpdate, update) => {
        this.setState({[stateToUpdate]: update})
    }

    addFavorite = (gameToAdd) => {
        const gamesArray = [...this.state.currentPlayer.games, gameToAdd]
        const player = {...this.state.currentPlayer}
        player.games = gamesArray
        this.setState({currentPlayer: player})
    }

    removeFavorite = (gameToRemove) => {
        const gamesArray = [...this.state.currentPlayer.games]
        const removedGame = gamesArray.findIndex(g => g.id === gameToRemove.id)
        gamesArray.splice(removedGame, 1)
        const player = {...this.state.currentPlayer}
        player.games = gamesArray
        this.setState({currentPlayer: player})
    }

    handleEditDependent = (dependentChanged, newDepedents) => {
        
        if(dependentChanged.Id == this.state.currentPlayer.id)
        {
            
            let newCurrent = newDepedents.find(d => d.id === dependentChanged.Id)
            this.setState({depedents: newDepedents, currentPlayer: newCurrent})
        }else {
            
            this.setState({depedents: newDepedents})
        }
    }
    
    render() {
        return (
            < Layout className = "layout" >
                <Header id="head">
                   <Navbar isAuthenticated={this.isAuthenticated} 
                            dependents={this.state.dependents} 
                            currentPlayer={this.state.currentPlayer} 
                            updateCurrentPlayer={this.updateCurrentPlayer} 
                            logout={this.logout} />
                                                                    
                </Header>
            <Content>

                    <Route exact path="/auth/login" render={(props) => {
                        return <Login {...props}
                                      login = {this.login}
                                />
                    }}
                    />
                    <Route exact path="/auth/register" render={(props) => {
                        return <Register {...props}
                                         register = {this.register}
                                />
                    }}
                    />


                    <Route exact path="/home" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <Home {...props} 
                                        currentPlayer={this.state.currentPlayer}
                                        addFavorite={this.addFavorite}
                                        removeFavorite={this.removeFavorite} 
                                   />
                        } else {
                            return <Redirect to="/auth/login" {...props}
                            />
                        }
                    }}
                    />

                    <Route exact path="/profile" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <Depedents {...props} handleEditDependent={this.handleEditDependent} dependents={this.state.dependents} userId={this.state.userId} setter={this.updateState} />
                        } else {
                            return <Redirect to="/auth/login" {...props}
                            />
                        }
                    }}
                    />

                    <Route exact path="/" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <Redirect to="/home" {...props} />
                        } else {
                            return <Redirect to="/auth/login" {...props}
                            />
                        }
                    }}
                    />
                <Footer>
                </Footer>
                </Content>
            </Layout >
            )
    }
}


export default withRouter(Sensei);
