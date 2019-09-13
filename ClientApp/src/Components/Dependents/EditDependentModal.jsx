import React, { Component } from 'react'
import { Row, Col, Modal, Form, Input, Button, Select } from 'antd'

const { Option } = Select;

export default class EditModal extends Component {


    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.userId,
            firstName: "",
            lastName: "",
            age: "",
            gender: ""
        }
    }

    state = {

    }
    
    handleFieldChange = (e) => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value;
        this.setState(stateToChange);
    }

    handleGenderChoice = (evt) => {
        this.setState({ gender: evt })
    }

    render() {

        return (
            <Modal
                visible={this.props.vis}
                width={600}
                mask={true}
                maskClosable={true}
                centered={true}
                onCancel={() => this.props.cancel("editModalVis")}
                footer={[
                    <Row key={1} type="flex" justify="center">
                        <Col>
                            <Button type="primary" onClick={() => this.props.submit(this.state)}>
                                Submit</Button>
                            <Button type="secondary" onClick={() => this.props.cancel("editModalVis")}>
                                Cancel</Button>
                        </Col>
                    </Row>

                ]}>
                <Row type="flex" justify="center">
                    <Col> <h1 className="login">Add A Player</h1>
                        <Form className="register-form" layout="vertical" labelCol={{ span: 8 }} wrapperCol={{ span: 20 }} >
                            <Form.Item label="First Name: ">
                                <Input id="name" onChange={this.handleFieldChange} />
                            </Form.Item>
                            <Form.Item label="Last Name: ">
                                <Input id="breed" onChange={this.handleFieldChange} />
                            </Form.Item>
                            <Form.Item label="Age: ">
                                <Input id="age" onChange={this.handleFieldChange} />
                            </Form.Item>
                            <Form.Item label="Gender: ">
                                <Select id="gender" defaultValue="male" onChange={this.handleGenderChoice}>
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        )
    }
}