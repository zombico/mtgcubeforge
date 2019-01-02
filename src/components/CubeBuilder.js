import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCube } from '@fortawesome/free-solid-svg-icons'
import SearchCard from './SearchCard';
import ToolTip from './ToolTip';
import MixedSpreadView from './MixedSpreadView';
import axios from "axios";

class CubeBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeId: 'banana',
      cubename: 'bread',
      cubeContents: [],
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
      <div className="App-header">             
        <Link to="/dashboard" className="App-header__builder">
          <FontAwesomeIcon icon={faUser} />
          <span className="App-header__builder-user">{this.state.username}</span>
        </Link> 
      </div>
        <SearchCard 
          loadCube={() => this.loadCube()} 
          cubeId={this.state.cubeId}
          hasControls={true}
        />
        <div className="view-header" >
          <h1 ><FontAwesomeIcon icon={faCube} /> {this.state.cubename}</h1>
          <h2 className="view-header__count" id="multicolorsection">{this.state.cubeContents.length} cards</h2>
        </div>        
        <div className="mixedspread-view" >
          { this.state.cubeContents.length > 0 ? 
            <MixedSpreadView 
            cubeContents={this.state.cubeContents}  
            loadCube={() => this.loadCube()}
            viewType={this.state.viewType}
            cubeId={this.state.cubeId}
            hasControls={true}
          /> :
          <p className="mixedspread-view__emptymsg">Use the search bar to find cards to add to your cube</p>
          }
        </div>
      </div>
    )
  }
}

export default CubeBuilder;