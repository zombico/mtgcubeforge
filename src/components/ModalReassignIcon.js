import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCog } from '@fortawesome/free-solid-svg-icons'
import Forge from './ForgeCardObject';
// import ToolTip from './ToolTip'

class ModalReassignIcon extends Component {
  state = {
    showModal: false,
    colors: '',
    cmc: '',
    versions: [],
    stateReqstCard: ''
  }
  toggleModal = () => {    
    if(this.state.showModal === false) {
      this.setState({ showModal: true })
    } else this.setState({ showModal: false })
  }
  
  parseColors(colors) {
    if(colors.length === 1) {
      return colors[0]
    }
    else if(colors.length > 1) {
      const mycolors = colors.toString()
      return mycolors
    }
  }


  componentWillMount() {
    this.getVersions(this.props.oracleid)
    const mycolors = this.parseColors(this.props.colors)
    

    this.setState({
      colors: mycolors,
      cmc: this.props.cmc
    })
  }

  handleColorChange(event) {
    event.preventDefault()
    this.setState({ colors: event.target.value });
  }

  handleCmcChange(event) {
    event.preventDefault()
    this.setState({ cmc: event.target.value });
  }

  getVersions(oracleId) {
    fetch(`https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${oracleId}&unique=prints`, {
      })
      .then(res => res.json())
      .then(result => {  
        this.setState({
          versions: result.data        
        }) 
    })
    .catch(error => console.error('Error', error))
  }

  changeVersion = (version) => {
    if (version.layout !== "emblem" && version.layout !== "vanguard" && version.layout !== "planar") {
     const newVersion = Forge(version)
     this.setState({
       stateReqstCard: newVersion,
     })    
    }        
  }

  render(){
    const versions = this.state.versions
    const cmc = this.state.cmc
    const colors = this.state.colors
    const stateReqstCard = this.state.stateReqstCard

    if(this.state.showModal === true ){   
    return (
      <div>
         <FontAwesomeIcon 
          className="icon icon-panel"
          icon={faCog}
        />
        <div className="modal__overlay">
            <div className="modal__newcube stats"> 
            <FontAwesomeIcon icon={faTimes} 
              onClick={() => this.toggleModal()}
              className="modal__newcube-closeicon"
            />         
            <form>
            <div className="modal__reassign-option">
            <label className="modal__reassign-label">Change color to</label>
            <select value={colors} onChange={(event)=>this.handleColorChange(event)}>
              <option value="U">Blue</option>
              <option value="B">Black</option>
              <option value="W">White</option>
              <option value="R">Red</option>
              <option value="G">Green</option>
              <option value="C">Colorless</option>
              <option value={`U,W`}>Azorius</option>
              <option value={`R,W`}>Boros</option>
              <option value={`B,U`}>Dimir</option>
              <option value={`B,G`}>Golgari</option>
              <option value={`G,R`}>Gruul</option>
              <option value={`R,U`}>Izzet</option>
              <option value={`B,W`}>Orzhov</option>
              <option value={`B,R`}>Rakdos</option>
              <option value={`G,W`}>Selesnya</option>
              <option value={`G,U`}>Simic</option>
            </select>
            </div>  
            <div className="modal__reassign-option">
            <label className="modal__reassign-label">Change converted mana cost to</label>
            <input
              type="number"
              className="modal__reassign-input"
              value={cmc}
              onChange={(event)=>this.handleCmcChange(event)}
            />
            </div>  
            </form>
            
            <button onClick={this.props.removeCard} >remove</button>
            <div className="versionchanger-box">
              <div className="versionchanger-label">Available versions</div>
              <div className="versionchanger">
              
              { versions && versions.map((version) =>               
                <div
                  key={version.id} 
                  onClick={() => this.changeVersion(version)} 
                  className={stateReqstCard.id === version.id ? 'container active' : 'container idle' }
                >{version.set_name}</div>                           
              )}
              
              </div>
            </div>
            
        </div>
      </div>
      </div>
      )
    }
    else if(this.state.showModal === false ){   
      return (
        <div>
          <FontAwesomeIcon 
          className="icon icon-panel" 
          icon={faCog}
          onClick={this.toggleModal}
        />
        </div>
        )
      }
      
  }
}

  export default ModalReassignIcon