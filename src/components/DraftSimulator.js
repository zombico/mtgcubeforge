import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
import Logo from './buttons/Logo'
import StatusLight from './buttons/StatusLight'
import Footer from './Footer'
import DraftPackViewer from './DraftPackViewer';

class DraftSimulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeId: 'banana',
      cubename: 'Loading cube...',
      cubeContents : [],
      draftContents: [],      
      players: "0",
      packs: 3,      
      draftPacks: [],
      draftStarted: false,
      myPicks: [],
      viewPackNumber: 0
    }
  this.loadCube = this.loadCube.bind(this);    
  this.handleChange = this.handleChange.bind(this)
  this.startDraft = this.startDraft.bind(this)
  this.makePacks = this.makePacks.bind(this)
  this.showPacks = this.showPacks.bind(this)
  this.shuffleArray = this.shuffleArray.bind(this)
  this.draftCard = this.draftCard.bind(this)
  this.getPassedPack = this.getPassedPack.bind(this)
  }
  
  async componentWillMount() {
    const cubeId = this.props.location.pathname.split('/')[2]
    await this.setState({ cubeId })
    this.loadCube();
  }

  async loadCube() {
    try {
      const response = await axios.get(`/cubes/${this.state.cubeId}`)
      // console.log(response)
      this.setState({ 
        cubeContents: response.data.data[0].contents,
        cubename: response.data.data[0].cubename,
        username: response.data.data[0].username
      })
    } catch (error) {
      console.log(error)
      this.setState({ hasError: true })
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  showPacks = () => {
    this.shuffleArray(this.state.cubeContents)
    this.makePacks()
  }

  startDraft = () => {
    this.shuffleArray(this.state.cubeContents)
    this.makePacks()
    this.setState({ draftStarted: true })
  }

  makePacks = async () => {
    const packsToMake = this.state.players * this.state.packs
    const cardsNeeded = packsToMake * 15  
    const draftContents = []
    const draftPacks = []
    
    for (let i = 0; i < cardsNeeded; i++) {
      draftContents.push(this.state.cubeContents[i])
      await this.setState({ draftContents })    
    }    

    for (let i = 0; i < packsToMake; i++) {
      let pack = {}
      pack.number = `pack${i}`
      pack.contents = []

      for (let o = 15 * i; o < 15 * i + 15; o++) {                
        await pack.contents.push(this.state.draftContents[o])                        
        pack.contents.length === 15 && draftPacks.push(pack.contents)               
      }
      this.setState({ draftPacks })
    }    
  }

  draftCard = (card, packNumber) => {
    const picks = this.state.myPicks
    picks.push(card)
    const currentPack = this.state.draftPacks[packNumber]
    const updatedPack = currentPack.filter(pick=> pick.id !== card.id)
    const allPacks = this.state.draftPacks
    allPacks[packNumber] = updatedPack
    const newPackNumber = this.state.viewPackNumber + 1

    this.setState({ 
      myPicks: picks,
      draftPacks: allPacks,
      viewPackNumber: newPackNumber 
     })
    
     this.getPassedPack(newPackNumber)
  }

  getPassedPack = (i) => {
    const pack = this.state.draftPacks[i]
    this.shuffleArray(pack)
    for (let i = 0; i < this.state.viewPackNumber; i++) {pack.shift()}
    
  }

  render() {    
    const viewPackNumber = this.state.viewPackNumber
    const draftPacks = this.state.draftPacks
    const draftStarted = this.state.draftStarted
    const cubelength = this.state.cubeContents.length
    const players = this.state.players
    
    return (
      <>
      <div className="tempmain">
        <div className="App-header"  id="viewsettings">
      
          <Logo />
          <StatusLight text="Draft Simulator" light="draft" />
        </div>
        <div className="draft__container">
        <h1>Drafting {this.state.cubename}</h1>
          <div className="draft__controlpanel">
            <div className="draft__control">
              <label>Set number of drafters</label>
              <select name="players" value={players} onChange={this.handleChange}>
                <option value={0}>- </option>
                {cubelength >= 90 && <option value="2">2</option>}
                {cubelength >= 135 && <option value="3">3</option>}
                {cubelength >= 180 && <option value="4">4</option>}
                {cubelength >= 225 && <option value="5">5</option>}
                {cubelength >= 270 && <option value="6">6</option>}
                {cubelength >= 315 && <option value="7">7</option>}
                {cubelength >= 360 && <option value="8">8</option>}
                {cubelength >= 405 && <option value="9">9</option>}              
                {cubelength >= 450 && <option value="10">10</option>}              
                {cubelength >= 495 && <option value="11">11</option>}              
                {cubelength >= 540 && <option value="12">12</option>}
              </select>
            </div>
            <div className="draft__control">
              <label>Set number of packs</label>
              <select name="packs" value={this.state.packs} onChange={this.handleChange}>
              
              <option value="3">3</option>
              {cubelength/players/4 >= 15 && <option value="4">4</option>}
              {cubelength/players/5 >= 15 && <option value="5">5</option>}
              </select>
            </div>
            <div className="dashboard__panel">
              {/* <button className={players === "0" ? "buttonprimary disabled" : "buttonprimary"} onClick={this.startDraft} >Start draft</button> */}
              <button className={players === "0" ? "buttonprimary disabled" : "buttonprimary"} onClick={this.showPacks} >Make Packs</button>
            </div>
          </div>
          { draftStarted && 
            <DraftPackViewer 
              packNumber={viewPackNumber}
              draftPack={draftPacks.length >0 && draftPacks[viewPackNumber]}        
              players={players}
              rounds={this.state.packs}
              draftCard={this.draftCard}
            />
          }
          <div className="packlist">
          {
            draftPacks.length > 0 &&            
            draftPacks.map((pack) => 
              // <div> {pack[0].name}</div>
              <ul>                
                {pack.map((card) => <li>{card.name} - {card.manacost}</li>)}
              </ul>
            )
          }
          </div>
        </div>
        <Footer />
      </div>
      </>
    )
  }
}

export default DraftSimulator;