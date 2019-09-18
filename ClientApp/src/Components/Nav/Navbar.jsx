import React, { Component } from 'react';
import logo from '../../Images/logo_transparent_green.png';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './Navbar.css';



class Navbar extends Component {
    state = {
        currentPlayer: "",
        user: sessionStorage.getItem("Token")

    }

    handleSelection = (e) => {
        console.log("Test")
        console.log(e)
    }


    handleClick = e => {
        if(e.key == "/auth/login"){
            this.setState({
            current: "/home",
        })}else{
            this.setState({
                current: e.key,
            })
        }
    }


    render() {
        return (
            <>
                <nav>
                    <div id="topNav">
                        <div id="logoContainer" className='logo'>
                            <img src={logo} alt="logo" className="nav-logo" />
                        </div>
                        <div onClick={this.handleSelection}>
                        {this.props.dependents.length > 0 ? <wired-combo id="combo" selected={this.props.dependents[0].id}>
                            {this.props.dependents.map(dependent => {
                                return <wired-item  className="comboItem"
                                                    selected={console.log("hello")} 
                                                    key={dependent.id} 
                                                    value={dependent.id}>
                                                        {dependent.firstName} {dependent.lastName}
                                        </wired-item>
                            }
                            )}
                            
                        </wired-combo> 
                        : null}
                        </div>
                            {!!this.props.isAuthenticated() ? (
                            <wired-card id="linksContainer">
                                <Menu id="NavMenu" onClick={this.handleClick} selectable={false} theme="dark" mode="horizontal">                           
                                    <Menu.Item key="/home">
                                        <Link className="nav-link" to="/home">Home</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/profile">
                                        <Link className="nav-link" to="/profile">Profile</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/auth/login">
                                        <Link className="nav-link" to="/auth/login" onClick={this.props.logout}>Logout</Link>
                                    </Menu.Item>
                                </Menu>
                            </wired-card>
                            ) : null}
                    </div>
                </nav>
            </>
        )
    }
}

export default withRouter(Navbar)