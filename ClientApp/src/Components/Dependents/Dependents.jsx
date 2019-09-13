import React, { Component } from 'react'
import { Row, Col, Table, Button, Divider, Modal } from 'antd'
import API from './DependentManager';

const { confirm } = Modal;

export default class Dependents extends Component {

  state = {
      isTableReady: false,
      createModalVis: false,
      editModalVis: false,
      deleteConfirm: false,
      dependents: []
    }

  componentDidMount() {
    API.getAllDependents()
            .then(response => {
              this.setState({dependents: response}, () => {
                this.setState({isTableReady: true})
              })
            })
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
              </span>
            )
          }
      ]

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

  showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this User?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        API.deleteDependent()
      }
    }); 
  }

  handleCreateSubmit = (obj) => {
    this.setState({isTableReady: false})
    this.cancelModal("createModalVis")
    API.addDependent(obj)
      .then(_response => {
        API.getAllDependents()
          .then(response => {
            this.setState({dependents: response}, () => {
              this.setState({isTableReady: true})
            })
          })
      })
  }

  handleEditSubmit = (obj) => {
    this.setState({isTableReady: false})
    this.cancelModal("editModalVis")
    API.editDependent(obj)
      .then(_response => {
        API.getAllDependents()
          .then(response => {
            this.setState({dependents: response}, () => {
              this.setState({isTableReady: true})
            })
          })
      })
  }

    render() {
            return (
                <>
                    <Row type="flex" justify="center">
                        <Col>
                         {this.isTableReady ? 
                            <Table 
                                dataSource={this.state.dependents} 
                                columns={this.columns}
                                title={() => "Player Manager"}
                                footer={() => <Button onClick={this.modal("createModalVis")}>Add Player</Button>}
                                pagination={false}
                                />
                            : <Spin size="large" />}
                        </Col>
                    </Row>
    
                    {this.state.createModalVis ? <CreateModal
                        vis={this.state.createModalVis}
                        submit={this.handleCreateSubmit}
                        cancel={this.cancelModal}
                        UserId={this.props.User.Id}
                        update={this.updateDependent}
                    /> : null}

                    {this.state.editModalVis ? <EditModal
                        vis={this.state.editModalVis}
                        submit={this.handleEditSubmit}
                        cancel={this.cancelModal}
                        uid={this.props.dependent.uid}
                        update={this.updateDependent}
                    /> : null} 

                    {this.state.deleteConfirm}
    
    
                </>
            )
        
    }
}
