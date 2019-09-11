import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import './auth.css';

export default class Register extends Component {
    state = {
        username: "",
        password: ""
    }

    handleFieldChange = (e) => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value;
        this.setState(stateToChange);
    }

    submit = () => {
        let user = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.register(user)
    }

    render() {

        return (
            <>
                <Row type="flex" justify="center" align="middle">
                    <Col>        
                            <h1 className="login">REGISTER</h1>
                            <Form onSubmit={this.submit} className="login-form" layout="vertical">

                                <Form.Item wrapperCol={{ col: 4 }} className="usernameBox" >
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="E-Mail"
                                        id="username"
                                        onChange={this.handleFieldChange}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        onChange={this.handleFieldChange}
                                        onKeyUp={this.handleEnter}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Row type="flex" justify="center" className="selectButtons">
                                        <Col>
                                            <Button onClick={this.submit} type="primary" className="login-form-button">
                                                Register</Button>
                                        </Col>
                                    </Row>
                                    <Row type="flex" justify="center" align="middle" className="selectButtons">
                                        <Col offset={6}>
                                        <span className="register">Already a member? </span>
                                            <Link className="reg-link" to="/auth/login">Log-In</Link>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>

                    </Col>
                </Row>

            </>
        )
    }
}
