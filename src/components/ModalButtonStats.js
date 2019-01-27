import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import ToolTip from './ToolTip'

class ModalButtonStats extends Component {
  state = {
    showModal: false,
    statOption: "type"  
  }
  

  toggleModal = () => {    
    if(this.state.showModal === false) {
      this.setState({ showModal: true })
    } else this.setState({ showModal: false })
  }

  toggleStatOption = () => {
    if(this.state.statOption === "type") {
      this.setState({ statOption: "cmc" })
    } else this.setState({ statOption: "type" })
  }

  render() {    
    const stats = this.props.stats
    
    const summary = () => {
      return (
        <>
          <h1 className="modal__newcube-title">Cube Statistics</h1>          
          { this.state.statOption === "type" ?
            <h2>Type and color <ToolTip icon={<FontAwesomeIcon icon={faQuestionCircle} />} text="Only one type is assigned to each card. Creatures are not counted in the artifacts and enchantments, and artifact lands are counted as lands." /> </h2> :
            <h2>Mana cost and color <ToolTip icon={<FontAwesomeIcon icon={faQuestionCircle} />} text="Cards with multiple faces and mana costs have their cmc's added up as per current rules. " /> </h2>
          }
          <table className="statsTable">
            <tbody>
              <tr>
                <th></th>
                <th><ToolTip symbol="M" text="Multi-color" /></th>
                <th><ToolTip icon={<img className="manasymbol" src="/symbols/bluemana.svg" alt="bluemanasymbol" />} text="Blue" /></th>
                <th><ToolTip icon={<img className="manasymbol" src="/symbols/blackmana.svg" alt="blackmanasymbol" />} text="Black" /></th>
                <th><ToolTip icon={<img className="manasymbol" src="/symbols/whitemana.svg" alt="whitemanasymbol"/>} text="White" /></th>
                <th><ToolTip icon={<img className="manasymbol" src="/symbols/redmana.svg" alt="redmanasymbol" />} text="Red" /> </th>
                <th><ToolTip icon={<img className="manasymbol" src="/symbols/greenmana.svg" alt="greenmanasymbol"/>} text="Green" /></th>
                <th><ToolTip icon={<img className="manasymbol" src="/symbols/colorlessmana.svg" alt="colorlessmanasymbol" />} text="Colorless" /></th>
                <th><ToolTip symbol="L" text="Land" /></th>
                <th>Total</th>
              </tr>
              {
                this.state.statOption === "type" &&
              <>
              <tr>
                <td>Creatures</td><td>{stats.multicolor.creatures}</td><td>{stats.blue.creatures}</td><td>{stats.black.creatures}</td><td>{stats.white.creatures}</td><td>{stats.red.creatures}</td><td>{stats.green.creatures}</td><td>{stats.colorless.creatures}</td><td>{stats.land.creatures}</td><td>{stats.all.creatures}</td>
              </tr>
              <tr>
                <td>Planeswalkers</td><td>{stats.multicolor.planeswalkers}</td><td>{stats.blue.planeswalkers}</td><td>{stats.black.planeswalkers}</td><td>{stats.white.planeswalkers}</td><td>{stats.red.planeswalkers}</td><td>{stats.green.planeswalkers}</td><td>{stats.colorless.planeswalkers}</td><td>{stats.land.planeswalkers}</td><td>{stats.all.planeswalkers}</td>
              </tr>
              <tr>
                <td>Instants</td><td>{stats.multicolor.instants}</td><td>{stats.blue.instants}</td><td>{stats.black.instants}</td><td>{stats.white.instants}</td><td>{stats.red.instants}</td><td>{stats.green.instants}</td><td>{stats.colorless.instants}</td><td>{stats.land.instants}</td><td>{stats.all.instants}</td>
              </tr>
              <tr>
                <td>Sorceries</td><td>{stats.multicolor.sorceries}</td><td>{stats.blue.sorceries}</td><td>{stats.black.sorceries}</td><td>{stats.white.sorceries}</td><td>{stats.red.sorceries}</td><td>{stats.green.sorceries}</td><td>{stats.colorless.sorceries}</td><td>{stats.land.sorceries}</td><td>{stats.all.sorceries}</td>
              </tr>
              <tr>
                <td>Enchantments</td><td>{stats.multicolor.enchantments}</td><td>{stats.blue.enchantments}</td><td>{stats.black.enchantments}</td><td>{stats.white.enchantments}</td><td>{stats.red.enchantments}</td><td>{stats.green.enchantments}</td><td>{stats.colorless.enchantments}</td><td>{stats.land.enchantments}</td><td>{stats.all.enchantments}</td>
              </tr>
              <tr>
                <td>Artifacts</td><td>{stats.multicolor.artifacts}</td><td>{stats.blue.artifacts}</td><td>{stats.black.artifacts}</td><td>{stats.white.artifacts}</td><td>{stats.red.artifacts}</td><td>{stats.green.artifacts}</td><td>{stats.colorless.artifacts}</td><td>{stats.land.artifacts}</td><td>{stats.all.artifacts}</td>
              </tr>
              <tr>
                <td>Land</td><td>{stats.multicolor.land}</td><td>{stats.blue.land}</td><td>{stats.black.land}</td><td>{stats.white.land}</td><td>{stats.red.land}</td><td>{stats.green.land}</td><td>{stats.colorless.land}</td><td>{stats.land.land}</td><td>{stats.all.land}</td>
              </tr>
              <tr className="heavy">
                <td>Total Cards</td><td>{stats.multicolor.totalCards}</td><td>{stats.blue.totalCards}</td><td>{stats.black.totalCards}</td><td>{stats.white.totalCards}</td><td>{stats.red.totalCards}</td><td>{stats.green.totalCards}</td><td>{stats.colorless.totalCards}</td><td>{stats.land.totalCards}</td><td>{stats.all.totalCards}</td>
              </tr>
              </>
              }
              {
                this.state.statOption === "cmc" &&
                <>
                <tr>
                  <td>0 cmc</td><td>{stats.multicolor.by0cc}</td><td>{stats.blue.by0cc}</td><td>{stats.black.by0cc}</td><td>{stats.white.by0cc}</td><td>{stats.red.by0cc}</td><td>{stats.green.by0cc}</td><td>{stats.colorless.by0cc}</td><td>{stats.land.by0cc}</td><td>{stats.all.by0cc}</td>
                </tr>
                <tr>
                  <td>1 cmc</td><td>{stats.multicolor.by1cc}</td><td>{stats.blue.by1cc}</td><td>{stats.black.by1cc}</td><td>{stats.white.by1cc}</td><td>{stats.red.by1cc}</td><td>{stats.green.by1cc}</td><td>{stats.colorless.by1cc}</td><td>{stats.land.by1cc}</td><td>{stats.all.by1cc}</td>
                </tr>
                <tr>
                  <td>2 cmc</td><td>{stats.multicolor.by2cc}</td><td>{stats.blue.by2cc}</td><td>{stats.black.by2cc}</td><td>{stats.white.by2cc}</td><td>{stats.red.by2cc}</td><td>{stats.green.by2cc}</td><td>{stats.colorless.by2cc}</td><td>{stats.land.by2cc}</td><td>{stats.all.by2cc}</td>
                </tr>
                <tr>
                  <td>3 cmc</td><td>{stats.multicolor.by3cc}</td><td>{stats.blue.by3cc}</td><td>{stats.black.by3cc}</td><td>{stats.white.by3cc}</td><td>{stats.red.by3cc}</td><td>{stats.green.by3cc}</td><td>{stats.colorless.by3cc}</td><td>{stats.land.by3cc}</td><td>{stats.all.by3cc}</td>
                </tr>
                <tr>
                  <td>4 cmc</td><td>{stats.multicolor.by4cc}</td><td>{stats.blue.by4cc}</td><td>{stats.black.by4cc}</td><td>{stats.white.by4cc}</td><td>{stats.red.by4cc}</td><td>{stats.green.by4cc}</td><td>{stats.colorless.by4cc}</td><td>{stats.land.by4cc}</td><td>{stats.all.by4cc}</td>
                </tr>
                <tr>
                  <td>5 cmc</td><td>{stats.multicolor.by5cc}</td><td>{stats.blue.by5cc}</td><td>{stats.black.by5cc}</td><td>{stats.white.by5cc}</td><td>{stats.red.by5cc}</td><td>{stats.green.by5cc}</td><td>{stats.colorless.by5cc}</td><td>{stats.land.by5cc}</td><td>{stats.all.by5cc}</td>
                </tr>
                <tr>
                  <td>6 cmc</td><td>{stats.multicolor.by6cc}</td><td>{stats.blue.by6cc}</td><td>{stats.black.by6cc}</td><td>{stats.white.by6cc}</td><td>{stats.red.by6cc}</td><td>{stats.green.by6cc}</td><td>{stats.colorless.by6cc}</td><td>{stats.land.by6cc}</td><td>{stats.all.by6cc}</td>
                </tr>
                <tr>
                  <td>7 cmc + above </td><td>{stats.multicolor.by7ccplus}</td><td>{stats.blue.by7ccplus}</td><td>{stats.black.by7ccplus}</td><td>{stats.white.by7ccplus}</td><td>{stats.red.by7ccplus}</td><td>{stats.green.by7ccplus}</td><td>{stats.colorless.by7ccplus}</td><td>{stats.land.by7ccplus}</td><td>{stats.all.by7ccplus}</td>
                </tr>
                <tr className="heavy">
                  <td>Total Cards</td><td>{stats.multicolor.totalCards}</td><td>{stats.blue.totalCards}</td><td>{stats.black.totalCards}</td><td>{stats.white.totalCards}</td><td>{stats.red.totalCards}</td><td>{stats.green.totalCards}</td><td>{stats.colorless.totalCards}</td><td>{stats.land.totalCards}</td><td>{stats.all.totalCards}</td>
                </tr>
                </>
              }
            </tbody>
          </table>
          
        </>
      )
    }

    
    if(this.state.showModal === true && this.props.display === "button") {    
      return (
        <div className="sneak-up">
          <button className="buttonprimary" onClick={() => this.toggleModal()}>Show Stats</button>
          <div className="modal__overlay">
            <div className="modal__newcube stats"> 
            
            <FontAwesomeIcon icon={faTimes} 
              onClick={() => this.toggleModal()}
              className="modal__newcube-closeicon"
            />         
                
              
              {this.props.color === "all" && summary()}
              <div className="modal__buttonpanel">
                <button onClick={() => this.toggleStatOption()} className="buttonsecondary ">
                {this.state.statOption === "type"? "See CMC stats" : "See card type stats" }
                </button>  
                <button className="buttonsecondary transparent" onClick={() => this.toggleModal()} >Return to cube</button>
              </div>
            </div>
          </div>
        </div>
      )}
      else if(this.state.showModal === false && this.props.display === "button") {
       return (
        <div className="sneak-up">
          <button className="buttonprimary primarysmaller" onClick={() => this.toggleModal()}>Show Stats</button>
        </div>
       ) 
    }
  }
} 

export default ModalButtonStats;
