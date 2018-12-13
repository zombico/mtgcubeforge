import React, { Component } from 'react';
import SearchCard from './SearchCard';
import MixedSpreadView from './MixedSpreadView';
import axios from "axios";

class CubeBuilder extends Component {
  constructor() {
    super();
    this.state = {
      cubeId: '5c11bfd9038a4b77a778a197',
      cubeContents : [],
      hasError: false,
      viewType: "card"
    }
  this.loadCube = this.loadCube.bind(this);  
  }
  
  componentWillMount() {
    this.loadCube();
  }

  async loadCube() {
    try {
      const response = await axios.get(`/cubes/${this.state.cubeId}`)
      this.setState({ cubeContents: response.data.data[0]})
    } catch (error) {
      console.log(error)
      this.setState({ hasError: true })
    }
  }
  
  

  render() {
    return (
      <div className="cubebuilder">
        <SearchCard 
          loadCube={() => this.loadCube()} 
          cubeId={this.state.cubeId}
          />
        <div className="spacer300" />
        <div className="mixedspread-view">
          <MixedSpreadView 
            cubeContents={this.state.cubeContents}  
            loadCube={() => this.loadCube()}
            viewType={this.state.viewType}
            cubeId={this.state.cubeId}
            />
        </div>
      </div>
    )
  }
}

export default CubeBuilder;