import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './Navbar.css';



class Navbar extends Component {

    constructor(props) {
        super(props);
        this.selectionRef = React.createRef();
        this.logoRef = React.createRef();
        this.listening = false;
    }
    
    state = {
        currentPlayer: "",
        user: sessionStorage.getItem("Token")
    }

    componentDidMount() {
        if(this.props.dependents.length > 0 && !this.listening){
            this.selectionRef.current.addEventListener('selected', e => this.updateDropDown(e))
            this.listening = true
        }
        if(this.props.currentPlayer.favoriteColor != undefined){
            const logo = `./images/logo_transparent_${this.props.currentPlayer.favoriteColor}.png`
            this.logoRef.current.src = logo
        }else{
            const logoList=["53B4B6", "DE8FB3", "B6F0DC", "84599D", "DB0D37", "FFBA38", "C3D8AA"]
            const randomLogo = logoList[Math.floor(Math.random()*logoList.length)]
            const logo =  `../images/logo_transparent_${randomLogo}.png`
            this.logoRef.current.src = logo
        }
    }

    updateDropDown = (e) => this.props.updateCurrentPlayer(e.detail.selected)

    componentDidUpdate() {
        if(this.props.dependents.length > 0 && !this.listening){
            this.selectionRef.current.addEventListener('selected', e => this.updateDropDown(e))
            this.listening = true
        }
        if(this.props.currentPlayer != undefined){
            const logo = `./images/logo_transparent_${this.props.currentPlayer.favoriteColor}.png`
            this.logoRef.current.src = logo
        }
    }

    componentWillUnmount() {
        this.listening = false;
        if(this.props.dependents.length > 0 && !this.listening){
            this.selectionRef.currentPlayer.removeEventListener("selected")
        }
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
                            <img ref={this.logoRef} alt="logo" className="nav-logo" />
                        </div>
                        <div onClick={this.handleSelection}>
                        {this.props.dependents.length > 0 ? <wired-combo ref={this.selectionRef} id="combo" selected={this.props.dependents[0].id}>
                            {this.props.dependents.map(dependent => {
                                // debugger
                                return <wired-item  className="comboItem"
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