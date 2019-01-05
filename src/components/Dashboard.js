import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faCube, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Logout from './Logout'
import ToolTip from './ToolTip'
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
        <li className="cubelist" key={cube._id}>
          <Link to={`/cubebuilder/${cube._id}`}>{cube.cubename}</Link> 
          
          <Link to={`/cubeviewer/${cube._id}`} target="_blank">
          
            { !oneditmode &&
              <ToolTip 
              text="View cube in new window" 
              icon={<FontAwesomeIcon icon={faShare} /> }
            />
            }
            
          </Link>  
                
          { oneditmode && 
            <FontAwesomeIcon icon={faTrashAlt} 
              cubeid={cube._id}
              onClick={(e) => this.deleteCube(e, cube._id)}
              className="icon icon-trash"
            />
          }
        </li>        
      )
      
    })

    return (
      
      <div className="tempmain">
        <header className="App-header">
          <Link to="/">
          <h3 className="smallheader"> <FontAwesomeIcon icon={faCube} /> MtGcubeforGe </h3> 
          </Link>
        </header>
        <div className="dashboard">          
          <h1 >Welcome, {user}</h1>
          <div className="dashboard__panel">
          { !oneditmode &&
          <button className="buttonprimary" onClick={this.showNewCubeModal}>Create New Cube</button> 
          }
          { !oneditmode ?
            <input 
              className="buttontransparent"
              type="submit" 
              value="Manage Cubes" 
              onClick={this.switchEdit}
            /> 
            :
            <input 
              className="buttontransparent"
              type="submit" 
              value="Back" 
              onClick={this.switchEdit}
            />
          }
          </div> 
          { newcubemodal && 
            <ModalNewCube user={user} getusercubes={this.getusercubes} hideNewCubeModal={this.hideNewCubeModal} />
          }
          
          <ul className="cubelist__container">
          <h2 className="cubelist__header"><FontAwesomeIcon icon={faCube} /> Edit Cubes</h2>
            {cubelist}
          </ul>
          
          <div>
            <Logout setUser={this.props.setUser}  />
          </div>
        </div>
      </div>
      
    )
  
  }
}

export default Dashboard