import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


class ScryfallLogo extends Component {    
  state = {
    uri: ''
  }

  componentWillMount() {
    this.getUri()
  }
  getUri() {
    fetch(`https://api.scryfall.com/cards/${this.props.id}`, {
    })
    .then(res => res.json())
    .then(result => {  
      this.setState({
        uri: result.scryfall_uri        
      }) 
    })
    
    .catch(error => console.error('Error', error))
  }

  render() {
    const uri = this.state.uri
    return (      
      <a target="_blank" href={uri} className="icon icon-panel" >
      <FontAwesomeIcon 
        icon={faSearch}
      />
      </a>              
    )
  }
}

export default ScryfallLogo;