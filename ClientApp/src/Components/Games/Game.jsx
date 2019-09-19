import React, { Component } from 'react'

export default class Game extends Component {
    state= {
        listen: false
    }

    render() {
        return (
            <>
                    <div className="buttonContainer">
                        <wired-icon-button id="btn2" class="red">close</wired-icon-button>
                        <wired-icon-button id="btn1">favorite</wired-icon-button>
                    </div>
                    <wired-card elevation="3"
                        onMouseEnter={() => this.setState({listen: true})} 
                        onMouseLeave={() => this.setState({listen: false})}> 
                            <Blob listening={this.state.blobListen}/>
                    </wired-card>
            </>
        )
    }
}
