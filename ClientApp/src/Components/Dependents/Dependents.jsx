import React, { Component } from 'react'
import { Row, Col, Table, Button, Divider } from 'antd'


export default class Dependents extends Component {

    state = {
        dependents: [{
            key: '1',
            firstName: 'Sean',
            lastName: 'Glavin',
            Age: '34',
            Gender: 'Male'
        }]
    }

    columns = [
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',  
        },
        {
          title: 'Age',
          dataIndex: 'Age',
          key: 'Age',
        },
        {
          title: 'Gender',
          dataIndex: 'Gender',
          key: 'Gender',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
              <span>
                <a onClick={this.handleEdit}>Edit</a>
                <Divider type="vertical" />
                <a onClick={this.handleDelete}>Delete</a>
                <Divider type="vertical" />
              </span>
            )
          }
      ]

    render() {
            return (
                <>
                    <Row type="flex" justify="center">
                        <Col>
                            <Table 
                                dataSource={this.state.dependents} 
                                columns={this.columns}
                                title={() => "Player Manager"}
                                footer={() => <Button onClick={this.handleCreate}>Add Player</Button>}
                                pagination={false}
                            />
                        </Col>
                    </Row>
    
                    {/* {this.state.createModalVis ? <CreateModal
                        vis={this.state.createModalVis}
                        submit={this.handleCreateSubmit}
                        cancel={this.cancelModal}
                        uid={this.props.user.uid}
                        update={this.updateDogs}
                    /> : null}
     */}
    
                </>
            )
        
    }
}
