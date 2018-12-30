import React, { Component } from 'react';
// import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
import MixedSpreadView from './MixedSpreadView';
import axios from "axios";

class CubeViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeId: 'banana',
      cubename: 'bread',
      cubeContents : [],
      hasError: false,
      viewType: "card",
      username: ""
    }
  this.loadCube = this.loadCube.bind(this);  
  }
  
  async componentWillMount() {
    console.log(this.props)
    const cubeId = this.props.location.pathname.split('/')[2]
    
    
    await this.setState({ cubeId })
    this.loadCube();
  }

  async loadCube() {
    try {
      const response = await axios.get(`/cubes/${this.state.cubeId}`)
      console.log(response)
      this.setState({ 
        cubeContents: response.data.data[0].contents,
        cubename: response.data.data[0].cubename,
        username: response.data.data[0].username
      })
    } catch (error) {
      console.log(error)
      this.setState({ hasError: true })
    }
  }
  
  

  render() {
    return (
      <div className="tempmain">
      <div className="App-header" />      
        <div className="view-header">
          <h1>{this.state.cubename}</h1>
          <h2>Built by {this.state.username}</h2>
        </div>
        <div className="mixedspread-view">
          <MixedSpreadView 
            cubeContents={this.state.cubeContents}  
            loadCube={() => this.loadCube()}
            viewType={this.state.viewType}
            cubeId={this.state.cubeId}
            hasControls={false}
          />
        </div>
      </div>
    )
  }
}

export default CubeViewer;