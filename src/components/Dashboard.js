import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faCube, faTrashAlt, faHammer } from '@fortawesome/free-solid-svg-icons'
import Logo from './buttons/Logo'
import Logout from './Logout'
import ToolTip from './ToolTip'
import ModalNewCube from './ModalNewCube'
import ModalDeleteCube from './ModalDeleteCube'
import Footer from './Footer'

class Dashboard extends Component {  
  state={
    cubes: [],
    editMode: false,
    showNewCubeModal: false,
    showDeleteCubeModal: false,
    cubetoDelete: '',
    cubenametoDelete: ''
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

  toggleDeleteCubeModal = (e, cubeid, cubename) => {
    e.preventDefault()
    if(!this.state.showDeleteCubeModal && cubeid && cubename) {
      this.setState({ 
        showDeleteCubeModal: true,
        cubetoDelete: cubeid,
        cubenametoDelete: cubename
       })
    } else if(this.state.showDeleteCubeModal) {
        this.setState({ 
        showDeleteCubeModal: false, 
        cubetoDelete: '',
        cubenametoDelete: ''
      })
    }
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
    e.preventDefault()
    try {
      const response = await axios.delete(`/cubes/${cubeid}/delete`, {cubeid})
      console.log(response)
      this.getusercubes()
      this.toggleDeleteCubeModal(e)
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const user = this.props.user || 'Create Account' 
    const cubes = this.state.cubes
    const newcubemodal = this.state.showNewCubeModal
    const oneditmode = this.state.editMode
    const deletecubemodal = this.state.showDeleteCubeModal


    const cubelist = cubes.map(cube => {
      return (        
        <li className="cubelist" key={cube._id}>
          <Link to={`/cubebuilder/${cube._id}`}>{cube.cubename}</Link>
          <div className="cubelist__buttonpanel">
          <Link to={`/cubeviewer/${cube._id}`} target="_blank">              
            <FontAwesomeIcon icon={faEye} className="icon" /> View              
            </Link>  
          { !oneditmode ?
            <Link to={`/cubebuilder/${cube._id}`}>
              <FontAwesomeIcon icon={faHammer} className="icon" /> Edit
            </Link> :
            <Link to="/" onClick={(e) => this.toggleDeleteCubeModal(e, cube._id, cube.cubename)}>
            <FontAwesomeIcon icon={faTrashAlt} 
              cubeid={cube._id}              
              className="icon"
            /> Delete
            </Link>  
          }
          
          </div>
        </li>        
      )
      
    })

    return (
      <>
      <div className="tempmain">
        <header className="App-header">
          <Logo />
        </header>
        <div className="dashboard">          
          <h1 >Welcome, {user}</h1>
          <div className="dashboard__splitter">
            <div className="dashboard__leftside">  
            
              <div className="dashboard__panel">              
              <button className="buttonprimary" onClick={this.showNewCubeModal}>Create New Cube</button> 
              
              { !oneditmode ?
                <input 
                  className="buttontransparent"
                  type="submit" 
                  value="Delete Cube" 
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
            </div> 
            { newcubemodal && 
              <ModalNewCube user={user} getusercubes={this.getusercubes} hideNewCubeModal={this.hideNewCubeModal} />
            }
            {
              deletecubemodal && 
              <ModalDeleteCube 
                cubeid={this.state.cubetoDelete} 
                cubename={this.state.cubenametoDelete}
                delete={(e) => this.deleteCube(e, this.state.cubetoDelete)} 
                toggle={(e) => this.toggleDeleteCubeModal(e, this.state.cubetoDelete, this.state.cubenametoDelete )}
              />
            } 
            <div className="dashboard__rightside">  
              <ul className="cubelist__container">
              <h2 className="cubelist__header">Your Cubes <FontAwesomeIcon icon={faCube} /> </h2>
                {cubelist}
              </ul>              
            </div>
            
          </div>
          <Logout setUser={this.props.setUser}  />
        </div>
      </div>
      <Footer />
      </>
    )
  
  }
}

export default Dashboard