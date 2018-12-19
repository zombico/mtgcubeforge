import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
import axios from "axios";
import Logout from './Logout'
import CubeBuilder from './CubeBuilder';

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
      <Router>
      <div>Dashboard
        {
          cubes.map(cube => (
            <>
            <Route path={`/cubebuilder/${cube._id}`}
              render={() => (
                <>
                <CubeBuilder cubeid={cube._id}/>
                
                </>
              )}
            />
            <li><Link to={`/cubebuilder/${cube._id}`}>{cube.cubename}</Link></li>
            </>
          ))
        }
        <Logout setUser={this.props.setUser} />
      </div>
      </Router>
    )
  
  }
}

export default Dashboard