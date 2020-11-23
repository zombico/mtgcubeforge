import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCog } from '@fortawesome/free-solid-svg-icons'
import Forge from './ForgeCardObject';
import DisplayPrices from './DisplayPrices';
// import ToolTip from './ToolTip'

class ModalReassignIcon extends Component {
  state = {
    showModal: false,
    colors: [],
    cmc: '',
    isFoil: "false",
    showAllLangs: true,
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
    else if (colors.length === 0) {
      return ''
    }
  }


  componentDidMount() {
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

  // handleFoil(e) {
  //   e.preventDefault()
  //   if (!this.state.isFoil) {
  //     this.setState({ isFoil: "true" })  
  //   } else this.setState({ isFoil: "false" })
  // }

  // handleLangs(e) {
  //   e.preventDefault()
  //   this.getVersions(this.props.oracleid)
  //   if (!this.state.showAllLangs) {
  //     this.setState({ showAllLangs: true })  
  //   } else this.setState({ showAllLangs: false })
  // }

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
    if (this.state.showAllLangs) {
      fetch(`https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${oracleId}&unique=prints&include_multilingual=true`, {
      })
      .then(res => res.json())
      .then(result => {  
        this.setState({
          versions: result.data        
        }) 
      }).catch(error => console.error('Error', error))
    } 
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
    modifiedCard.colors = this.state.colors !== "" ? this.state.colors.split(",") : []
    await this.props.removeCard()
    this.props.loadCube()

    const layout = this.state.stateReqstCard.layout
      if (layout === "emblem" || layout === "vanguard" || layout === "planar" ) {
        return console.log('error')
      } else try {
        await this.state.stateReqstCard && axios.patch(`/cubes/${this.props.cubeid}/add`, modifiedCard)
        this.props.loadCube()
        
      } catch(e) {
        console.log(e)
      }
  }

  render(){
    const { versions, cmc, colors, showAllLangs, stateReqstCard, isFoil } = this.state
    const id = stateReqstCard.id
    const match = versions && versions.length > 0 && versions.filter(e => e.id === id)
    const prices = match && match[0] && match[0].prices
    const priceArray = prices && Object.entries(prices) || []
    console.log(priceArray)
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
            
          <div style={{display: 'flex'}}>
            <div className="versionchanger-box" style={{flexGrow: 1}}>
              <div className="versionchanger-label">Available versions</div>
              <div className="versionchanger">
              
              { versions && versions.map((version) =>               
                <div
                  key={version.id} 
                  onClick={() => this.changeVersion(version)} 
                  className={stateReqstCard.id === version.id ? 'container active' : 'container idle' }
                >{version.set_name} - {version.lang.toUpperCase()}</div>                           
              )}
              
              </div>
              {
              this.props.hasControls &&
            <>
            <form>
            <div className="modal__reassign-option">
              <label className="modal__reassign-label">Reassign to color section</label>
              <select value={colors} onChange={(event)=>this.handleColorChange(event)}>
                <option value="U">Blue</option>
                <option value="B">Black</option>
                <option value="W">White</option>
                <option value="R">Red</option>
                <option value="G">Green</option>
                <option value="">Colorless</option>
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
                <option value={`B,G,W`}>Abzan</option>
                <option value={`G,U,W`}>Bant</option>
                <option value={`B,U,W`}>Esper</option>
                <option value={`B,R,U`}>Grixis</option>
                <option value={`R,U,W`}>Jeskai</option>
                <option value={`B,G,R`}>Jund</option>
                <option value={`B,R,W`}>Mardu</option>
                <option value={`G,R,W`}>Naya</option>
                <option value={`B,G,U`}>Sultai</option>
                <option value={`G,R,U`}>Temur</option>
                <option value={`W,B,G,R,U`}>Unaligned</option>
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

            
            </>
            }
            </div>
              
            <div className="versionchanger-preview">
              <img className="preview-img-med" src={this.state.stateReqstCard.imgmd} />  
              <div>{DisplayPrices(priceArray)}</div>
            </div>
          </div>      
          {
              this.props.hasControls &&
          <div className="dashboard__panel">
            <button className="buttonsecondary" onClick={this.addCard}>Modify card</button>
            <button className="buttontransparent" onClick={this.props.removeCard} >Delete card</button>
          </div>
          }
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