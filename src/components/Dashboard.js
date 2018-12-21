import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom"
import axios from "axios";
import Logout from './Logout'
import CubeBuilder from './CubeBuilder';
import ModalNewCube from './ModalNewCube'

class Dashboard extends Component {  
  state={
    cubes: [],
    
    showNewCubeModal: false
  }
  componentDidMount() {
    this.getusercubes()
  }

  showNewCubeModal = () => {
    this.setState({ showNewCubeModal: true })
  }

  hideNewCubeModal = () => {
    this.setState({ showNewCubeModal: false })
  }

  getusercubes = async () => {
    try {
      const response = await axios.get(`/cubes/${this.props.user}/all`)
      const cubes = response.data.data[0]
      this.setState({ cubes })
      // this.hideNewCubeModal()
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const user = this.props.user || 'Create Account' 
    const cubes = this.state.cubes
    const newcubemodal = this.state.showNewCubeModal
    


    const cubelist = cubes.map(cube => {
      return (
        <div>
          <li><Link to={`/cubebuilder/${cube._id}`}>{cube.cubename}</Link></li>
        </div>
      )
      
    })

    return (
      
      <div>
        <header className="App-header">{user}</header>
        <h1 >Dashboard</h1>
        {!newcubemodal && <button onClick={this.showNewCubeModal}>Create New Cube</button>}
        { newcubemodal && 
          <ModalNewCube user={user} getusercubes={this.getusercubes} hideNewCubeModal={this.hideNewCubeModal} />
        }
        <ul>
          {cubelist}
        </ul>

        <Logout setUser={this.props.setUser} />
        
      </div>
      
    )
  
  }
}

export default Dashboard