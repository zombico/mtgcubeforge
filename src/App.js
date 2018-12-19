import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom"
import axios from "axios";
import './styles/css/App.css';
// import SearchCard from './components/SearchCard';
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
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
        const res = await axios.get('/myaccount', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // 4. If a successful response returns, store the user in state.
        console.log(res.data)
        this.setUser(res.data.data[0].name)
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
    const user = this.state.user || 'Create Account' 
    return (
      <div className="App">
        
        <header className="App-header">{user}</header>
        
        
        <Router>
          <>          
          {/* <Route exact path="/cubebuilder"
            render={() => (
              <div className="tempmain"> <CubeBuilder user={this.state.user} /> </div>
            )}
          /> */}
          <Route exact path ="/"
            render={() => (
              this.state.user ?
              <Dashboard user={this.state.user} setUser={this.setUser} /> 
              :
              <Redirect to="/login" />
            )}
          />
          <Route
              path="/login"
              render={() => (
                this.state.user ?
                  <Redirect to="/" />
                :
                  <Login getCurrentUser={this.getCurrentUser}/>
              )}
            />
          
          </>
        </Router>  
        
      </div>
    );
  }
}

export default App;
