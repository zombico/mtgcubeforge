import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
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
      // console.log(res.data.data[0]._id)
      this.setState({ isSubmitted: true, cubeId: res.data.data[0]._id })
      this.props.getusercubes()
      
    } catch(e) {
      console.log(e)
    }
  }

  render() {    
      return (
        <div className="modal__overlay">
          <div className="modal__newcube"> 
           <FontAwesomeIcon icon={faTimes} 
            onClick={this.props.hideNewCubeModal}
            className="modal__newcube-closeicon"
           />         
            { !this.state.isSubmitted ? 
              <form onSubmit={this.newcube}>          
                <label htmlFor="new-cube-button" className="modal__newcube-title">Enter cube name </label>
                <input
                  type="name"
                  onChange={this.handleChange}
                  name="cubename"
                  id="new-cube-button"
                  placeholder="ie: Old-school 1993"
                  className="modal__newcube-input fullwidth" 
                  autoComplete="off"
                />
                <div className="modal__buttonpanel">
                  <input className="buttonsecondary" type="submit" value="Start Building" />            
                </div>
              </form>
              :
              <Redirect to={`/cubebuilder/${this.state.cubeId}`} />
            }
          </div>
        </div>
      )}
} 

export default ModalNewCube;