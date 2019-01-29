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
    } else 
      this.setState({ showModal: false })
      this.props.loadCube()
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
    this.getCard(this.props.id)
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

  getCard(id) {
    fetch(`https://api.scryfall.com/cards/${id}`, {
    })
    .then(res => res.json())
    .then(result => {        
      const newCard = result.id && Forge(result)      
      this.setState({ stateReqstCard: newCard })  
    }
  )}

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

  addCard = async () => {
    const modifiedCard = await this.state.stateReqstCard
    modifiedCard.cmc = this.state.cmc
    modifiedCard.colors = this.state.colors
    await this.props.removeCard()
    this.props.loadCube()

    const layout = this.state.stateReqstCard.layout
      if (layout === "emblem" || layout === "vanguard" || layout === "planar" ) {
        return console.log('error')
      } else try {
        this.state.stateReqstCard && axios.patch(`/cubes/${this.props.cubeid}/add`, modifiedCard)
        this.props.loadCube()
        
      } catch(e) {
        console.log(e)
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
            {
              this.props.hasControls &&
            <>
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
            
            <div className="modal__reassign__options">
              <div className="modal__reassign-option">
                <label className="modal__reassign-label">Change converted mana cost to</label>
                <input
                  type="number"
                  className="modal__reassign-input"
                  value={cmc}
                  onChange={(event)=>this.handleCmcChange(event)}
                />
              </div>  
            </div>
            </form>

            <div className="dashboard__panel">
              <button className="buttonsecondary" onClick={this.addCard}>Modify card</button>
              <button className="buttontransparent" onClick={this.props.removeCard} >Delete card</button>
            </div>
            </>
            }
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
          <div className="versionchanger-preview">
            <img className="preview-img-med" src={this.state.stateReqstCard.imgmd} />  
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