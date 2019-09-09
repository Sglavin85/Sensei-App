import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import { Route, Redirect } from 'react-router-dom';


const { Header, Content, Footer } = Layout

class Sensei extends Component {

    render() {
        return (
            < Layout classname = "layout" >
                <Header>
                </Header>
            <Content>

                    <Route path="/auth" render={(props) => {
                        return <AuthViews {...props}
                            loginState={this.props.loginState}
                            login={this.login}
                        />
                    }}
                    />

                    <Route exact path="/home" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <OwnerHomeView {...props} user={this.props.user} />
                        } else {
                            return <Redirect to="/auth/login"
                            />
                        }
                    }}
                    />

                    <Route exact path="/profile" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <OwnerHomeView {...props} user={this.props.user} />
                        } else {
                            return <Redirect to="/auth/login"
                            />
                        }
                    }}
                    />

                </Content>
            </Layout >
            )
    }
}
}

export default Sensei;
