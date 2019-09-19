import React, { Component } from 'react'
import { Row, Col, Table, Button, Divider, Modal, Popconfirm, Spin } from 'antd'
import EditModal from './EditDependentModal'
import CreateModal from './CreateDependentModal'
import API from './DependentManager';
import { thisTypeAnnotation } from '@babel/types';

const { confirm } = Modal;

export default class Dependents extends Component {

  state = {
      isTableReady: true,
      createModalVis: false,
      editModalVis: false,
      deleteConfirm: false,
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
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
              <span>
                <a onClick={() => this.openEdit(record.id)}>Edit</a>
                <Divider type="vertical" />
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                   <a>Delete</a>
                </Popconfirm>
              </span>
            )
          }
      ]

  openEdit = (id) => {
    const recordToEdit = this.props.dependents.find(record => record.id === id)
    this.setState({recordToEdit}, () => this.setState({editModalVis: true}))
  }

  modal = (modalName) => {
    const stateToChange = { [modalName]: true }
      this.setState(
        stateToChange
      );
  }

  cancelModal = (modalName) => {
    this.setState({
      [modalName]: false
    })
  }

  handleDelete = (id) => {
    const token = JSON.parse(sessionStorage.getItem("Token"))
    API.deleteDependent(id, token) 
    .then(_response => {
      API.getAllDependents(token.token)
        .then(response => {
          this.props.setter("dependents", response)
        })
    })
  }

  handleCreateSubmit = (obj) => {
    const token = JSON.parse(sessionStorage.getItem("Token"))
    this.cancelModal("createModalVis")
    API.addDependent(obj, token)
      .then(_response => {
        API.getAllDependents(token.token)
          .then(response => {
            this.props.setter("dependents", response)
          })
      })
  }

  handleEditSubmit = (obj) => {
    const token = JSON.parse(sessionStorage.getItem("Token"))
    this.cancelModal("editModalVis")
    API.editDependent(obj, token)
      .then(_response => {
        API.getAllDependents(token.token)
          .then(repsonse => {
            
            this.props.handleEditDependent(obj, repsonse)
          })
      })
  }

    render() {
            return (
                <>
                    <Row type="flex" justify="center">
                        <Col>
                        <h1>Player Manager</h1>
                         {this.state.isTableReady ? 
                            <Table 
                                rowKey={record => record.id}
                                dataSource={this.props.dependents} 
                                columns={this.columns}
                                footer={() => <Button onClick={() => this.modal("createModalVis")}>Add Player</Button>}
                                pagination={false}
                                />
                            : <Spin size="large" />}
                        </Col>
                    </Row>
    
                    {this.state.createModalVis ? <CreateModal
                        vis={this.state.createModalVis}
                        submit={this.handleCreateSubmit}
                        cancel={this.cancelModal}
                        userId={this.props.userId}
                        update={this.updateDependent}
                    /> : null}

                    {this.state.editModalVis ? <EditModal
                        vis={this.state.editModalVis}
                        submit={this.handleEditSubmit}
                        cancel={this.cancelModal}
                        userId={this.props.userId}
                        record={this.state.recordToEdit}
                    /> : null} 

                    {this.state.deleteConfirm}
    
    
                </>
            )
        
    }
}
