import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
import axios from "axios";
import Logout from './Logout'
import CubeBuilder from './CubeBuilder';
import ModalNewCube from './ModalNewCube'

class Dashboard extends Component {  
  state={
    cubes: [],
    isBuilderLive: false,
    showNewCubeModal: false
  }
  componentDidMount() {
    this.killBuilderLive()
  }

  setBuilderLive = () => {
    this.setState({ isBuilderLive: true })
  }

  killBuilderLive = () => {
    this.getusercubes()
    this.setState({ isBuilderLive: false })
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
      this.hideNewCubeModal()
    } catch(e) {
      console.log(e)
    }
  }

 

  render() {
    const user = this.props.user || 'Create Account' 
    const cubes = this.state.cubes
    const newcubemodal = this.state.showNewCubeModal
    const cubeinactive = !this.state.isBuilderLive

    const cubelist = cubes.map(cube => (
      <>
      <Route exact path={`/cubebuilder/${cube._id}`}
        render={() => (                                
         <CubeBuilder cubeid={cube._id} setBuilderLive={this.setBuilderLive}/>                
        )}
      />
      {cubeinactive && <li><Link to={`/cubebuilder/${cube._id}`}>{cube.cubename}</Link></li>}
      </>
    ))

    return (
      <Router>
      <div>
        <header className="App-header">{user}</header>
        { cubeinactive && 
          <>  
          <h1 >Dashboard</h1>
          {!newcubemodal && <button onClick={this.showNewCubeModal}>Create New Cube</button>}
          { newcubemodal && 
            <ModalNewCube user={user} getusercubes={this.getusercubes} />
          }
          </>
        }
        { 
          cubelist
        }
        
        <Logout setUser={this.props.setUser} />
        
      </div>
      </Router>
    )
  
  }
}

export default Dashboard