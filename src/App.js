import React, { Component } from 'react';
import './styles/css/App.css';
// import SearchCard from './components/SearchCard';
import CubeBuilder from './components/CubeBuilder';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <div class="tempmain"> <CubeBuilder /> </div>
          
        
      </div>
    );
  }
}

export default App;
