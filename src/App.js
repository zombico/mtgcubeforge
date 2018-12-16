import React, { Component } from 'react';
import axios from "axios";
import './styles/css/App.css';
// import SearchCard from './components/SearchCard';
import Login from './components/Login';
import Logout from './components/Logout';
import CubeBuilder from './components/CubeBuilder';
import { getToken } from './services/tokenService'

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.getCurrentUser()
  }
  getCurrentUser = async () => {
    
    const token = getToken()
    console.log(token)
    if(token) {
      try {
        const res = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // 4. If a successful response returns, store the user in state.
        console.log(res.data)
        this.setUser(res.data)
      } catch(e) {
        console.log(e)
      }
    }
    // 3. Pass the token as an Authorization Header    
  };
  setUser = user => {
    this.setState({ user });
};
  render() {
    return (
      <div className="App">
        
        <header className="App-header">hello</header>
        <Login getCurrentUser={() => this.getCurrentUser()} />
        <Logout setUser={this.setUser} />
        <div class="tempmain"> <CubeBuilder /> </div>
          
        
      </div>
    );
  }
}

export default App;
