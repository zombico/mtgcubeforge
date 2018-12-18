import React, { Component } from 'react';
import Logout from './Logout'
import axios from "axios";

class Dashboard extends Component {  
  state={
    cubes: []
  }
  componentDidMount() {
    this.getusercubes()
  }

  getusercubes = async () => {
    try {
      const response = await axios.get(`/cubes/${this.props.user}/all`)
      const cubes = response.data.data[0]
      this.setState({ cubes })
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const cubes = this.state.cubes
    return (
      <div>Dashboard
        {
          cubes.map(cube => (
            <li>{cube.cubename}</li>
          ))
        }
        <Logout setUser={this.props.setUser} />
      </div>
    )
  
  }
}

export default Dashboard