import React, { Component } from 'react';
import logo from '../../Images/logo_transparent_green.png';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './Navbar.css';


class Navbar extends Component {
    state = {
        current: "/home",
        user: sessionStorage.getItem("Token")
    }

    handleClick = e => {
        this.setState({
            current: e.key,
        })
    }


    render() {
        return (
            <>
                <nav>
                    <div id="topNav">
                        <div id="logoContainer" className='logo'>
                            <img src={logo} alt="logo" className="nav-logo" />
                        </div>
                        <div id="linksContainer">
                            {!!this.props.isAuthenticated ? (
                            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">                           
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
                            ) : null}
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default withRouter(Navbar)