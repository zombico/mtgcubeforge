import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import axios from "axios";
import './styles/css/App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CubeBuilder from './pages/CubeBuilder';
import CubeViewer from './pages/CubeViewer';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import About from './pages/About';
import DraftSimulator from './components/DraftSimulator';

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
    if(token) {
      try {
        const res = await axios.get('/myaccount', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // 4. If a successful response returns, store the user in state.        
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
    
    return (
      <div className="App">
        <Router>
          <>        
          <Route
            path="/cubeviewer"
            render={(props) => {                
              return (
                <CubeViewer {...props} />  
              )
            }}
          /> 
          <Route
            path="/draft"
            render={(props) => {                
              return (
                <DraftSimulator {...props} />  
              )
            }}
          />
          <Route 
            exact path="/"
            render={() => <Redirect to="/home" /> }
          />
          <Route 
            path ="/home"
            render={() => (
              this.state.user ?
              <Redirect to="/dashboard" />
              :
              <HomePage />
              ) }
          />
          <Route 
            path="/view"
          />
          <Route 
            path="/cubebuilder"
            render={(props) => {                
              return (
                this.state.user ? <CubeBuilder {...props} /> : <CubeViewer {...props} />  
              )
             }}
          />
          <Route
            exact path="/about"
            render={() => <About /> }
          />
          <Route 
            exact path ="/dashboard"
            render={() => (
              this.state.user ?
              <Dashboard user={this.state.user} setUser={this.setUser} /> 
              :
              <Redirect to="/home" />
            )}
          />
          <Route
            path="/login"
            render={() => (
              this.state.user ?
                <Redirect to="/dashboard" />
              :
                <Login getCurrentUser={this.getCurrentUser} />
            )}
          />
          <Route
            path="/signup"
            render={() => (
              this.state.user ?
                <Redirect to="/dashboard" />
              :
              <Signup getCurrentUser={this.getCurrentUser}/>
            )}
          />
          {/* Hotfix for high rank page issue */}
          <Route
            path="/cubeviewer/5d86e2390ade3451f49d616b"
            render={() => <Redirect to="/home"/> }
          />
          </>
        </Router>  
        
      </div>
    );
  }
}

export default App;
