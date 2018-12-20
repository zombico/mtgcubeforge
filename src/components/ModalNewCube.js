import React, { Component } from 'react';
import axios from 'axios'

class ModalNewCube extends Component {
  state = {
    cubename: null
    
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
      console.log(res)
      this.props.getusercubes()
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    // if (this.state.show)
    return (
      <div className="modal__newcube">        
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
        </form>        
      </div>
    )
    // else return ('')
  }
} 

export default ModalNewCube;