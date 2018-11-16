import React, { Component } from 'react';
import SearchCard from './SearchCard';
import MixedSpreadView from './MixedSpreadView';
import axios from "axios";

class CubeBuilder extends Component {
  constructor() {
    super();
    this.state = {
      cubeContents : [],
      hasError: false
    }
  this.loadCube = this.loadCube.bind(this);  
  }
  
  componentWillMount() {
    this.loadCube();
  }

  async loadCube() {
    try {
      const response = await axios.get('/fulgrens_cube')
      this.setState({ cubeContents: response.data })
    } catch (error) {
      console.log(error)
      this.setState({ hasError: true })
    }
  }
  
  

  render() {
    return (
      <div>
        <SearchCard loadCube={() => this.loadCube()} />
        <div className="mixedspread-view">
          <MixedSpreadView 
            cubeContents={this.state.cubeContents}  
            loadCube={() => this.loadCube()}
            />
        </div>
      </div>
    )
  }
}

export default CubeBuilder;