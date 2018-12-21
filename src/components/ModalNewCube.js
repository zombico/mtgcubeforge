import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import axios from 'axios'

class ModalNewCube extends Component {
  state = {
    cubename: null,
    isSubmitted: false,
    cubeId: ''    
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  newcube = async e => {
    e.preventDefault();
    const cubename = this.state.cubename
    const username = this.props.user 
    try {
      const res = await axios.post('/cubebuilder/newcube', { cubename, username })
      console.log(res.data.data[0]._id)
      this.setState({ isSubmitted: true, cubeId: res.data.data[0]._id })
      this.props.getusercubes()
      
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    // if (!this.state.isSubmitted) {
      return (
        <div className="modal__overlay">
          <div className="modal__newcube">
          <i class="fas fa-igloo"></i>        
            { !this.state.isSubmitted ? 
              <form onSubmit={this.newcube}>          
                <label htmlFor="new-cube-button">Cube Name </label>
                <input
                  type="name"
                  onChange={this.handleChange}
                  name="cubename"
                  id="new-cube-button"
                  placeholder="ie: Old-school 1993"
                />
                <input type="submit" value="Create new Cube" />
                <input type="submit" value="Cancel" onClick={this.props.hideNewCubeModal} />
              </form>
              :
              <Link to={`/cubebuilder/${this.state.cubeId}`}>Start Building Cube</Link>
            }
          </div>
        </div>
      )}
  //   else 
  //     return (
  //       <div className="modal__newcube">
  //         <Link to={`/cubebuilder/${this.state.cubeId}`}>Start Building Cube</Link>
  //       </div>
  //     )
  // }
} 

export default ModalNewCube;