import React, { Component } from 'react';
import axios from "axios";
import './styles/css/App.css';
// import SearchCard from './components/SearchCard';
import Login from './components/Login';
import CubeBuilder from './components/CubeBuilder';
import { getToken } from './services/tokenService'

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    // When the app loads, try and get the current user
    this.getCurrentUser()
  }
  getCurrentUser = async () => {
    // 1. Try and retrieve the user's token
    const token = getToken()
    // 2. If they have a token, make a request to /user/current for their user details
    if(token) {
      try {
        const res = await axios.get('/user/current', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // 4. If a successful response returns, store the user in state.
        this.setUser(res.data)
      } catch(e) {
        console.log(e)
      }
    }
    // 3. Pass the token as an Authorization Header    
  };
  setUser = user => {
    // Set the current user into state.
    this.setState({ user });
};
  render() {
    return (
      <div className="App">
        
        <header className="App-header">hello</header>
        <Login />
        <div class="tempmain"> <CubeBuilder /> </div>
          
        
      </div>
    );
  }
}

export default App;
