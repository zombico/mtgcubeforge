import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom"
import axios from "axios";
import Logout from './Logout'
import ModalNewCube from './ModalNewCube'

class Dashboard extends Component {  
  state={
    cubes: [],
    editMode: false,
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

  switchEdit = () => {
    if (!this.state.editMode) {
      this.setState({ editMode: true })
    }
    else this.setState({ editMode: false })
    
  }

  deleteCube = async (e, cubeid) => {
    console.log(e, cubeid)
    try {
      const response = await axios.delete(`/cubes/${cubeid}/delete`, {cubeid})
      console.log(response)
      this.getusercubes()
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const user = this.props.user || 'Create Account' 
    const cubes = this.state.cubes
    const newcubemodal = this.state.showNewCubeModal
    const oneditmode = this.state.editMode


    const cubelist = cubes.map(cube => {
      return (
        <div>
          <li>
            <Link to={`/cubebuilder/${cube._id}`}>{cube.cubename}</Link>      
            { oneditmode && 
              <input type="submit" 
                value="Delete" 
                cubeid={cube._id}
                onClick={(e) => this.deleteCube(e, cube._id)}
              /> 
            }
          </li>
        </div>
      )
      
    })

    return (
      
      <div className="tempmain">
        <header className="App-header">{user}</header>
        <h1 >Dashboard</h1>
        {!newcubemodal && <button onClick={this.showNewCubeModal}>Create New Cube</button>}
        { newcubemodal && 
          <ModalNewCube user={user} getusercubes={this.getusercubes} hideNewCubeModal={this.hideNewCubeModal} />
        }
        <ul>
          {cubelist}
        </ul>
        { !oneditmode ?
          <input 
            type="submit" 
            value="Manage Cubes" 
            onClick={this.switchEdit}
          /> 
          :
          <input 
            type="submit" 
            value="Back" 
            onClick={this.switchEdit}
          />
        }
        <div>
          <Logout setUser={this.props.setUser} />
        </div>
        
      </div>
      
    )
  
  }
}

export default Dashboard