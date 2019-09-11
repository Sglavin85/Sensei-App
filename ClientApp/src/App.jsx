import React, { Component } from 'react';
import { withRouter } from 'react-router'
import './App.css';
import Navbar from './Components/Nav/Navbar'
import Login from './Auth/Login';
import Register from './Auth/Register';
import Home from './Components/Home';
import Profile from './Components/Profile';
import { Layout } from 'antd';
import { Route, Redirect } from 'react-router-dom';
import API from './Auth/UserManager';


const { Header, Content, Footer } = Layout

class Sensei extends Component {

    state = {
        userIsLoggedIn : false
    }

    isAuthenticated = () => sessionStorage.getItem("Token") !== null;
    
    login = (user) => {
        API.login(user)
        .then(response => {            
            if(response.token !== undefined)
            {               
                let token = JSON.stringify(response)
                sessionStorage.setItem("Token", token)
            }
        })
        .then(_reply => {
            this.setState({userIsLoggedIn: true})
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
    
    render() {
        return (
            < Layout className = "layout" >
                <Header>
                    <Navbar user={this.state.userIsLoggedIn} logout={this.logout} />
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
                            return <Home {...props} />
                        } else {
                            return <Redirect to="/auth/login" {...props}
                            />
                        }
                    }}
                    />

                    <Route exact path="/profile" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <Profile {...props} />
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
