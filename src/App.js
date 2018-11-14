import React, { Component } from 'react';
import './styles/css/App.css';
import SearchCard from './components/SearchCard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div class="tempmain"> <SearchCard /> </div>
          
        </header>
      </div>
    );
  }
}

export default App;
