import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
import Logo from './buttons/Logo'
import MixedSpreadView from './MixedSpreadView';
import SearchCard from './SearchCard'
import ModalSampleHand from './ModalSampleHand';
import ModalExportList from './ModalExportList'
import StatusLight from './buttons/StatusLight'
import Footer from './Footer'

class CubeViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeId: 'banana',
      cubename: 'Loading cube...',
      cubeContents : [],
      hasError: false,
      viewType: "card",
      sortType: "alphabetic",
      enableHoverZoom: false,
      showTypes: true,
      username: "...",
      toggleSampleHandModal: false,
    }
  this.loadCube = this.loadCube.bind(this);  
  this.toggleSampleHandModal = this.toggleSampleHandModal.bind(this)
  this.handleViewChange = this.handleViewChange.bind(this)
  this.handleSortChange = this.handleSortChange.bind(this)
  this.toggleAutoZoom = this.toggleAutoZoom.bind(this)
  this.toggleShowTypes = this.toggleShowTypes.bind(this)
  }
  
  async componentDidMount() {
    console.log(this.props)
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
  toggleSampleHandModal = () => {
    if(this.state.toggleSampleHandModal === false) {
      this.setState({ toggleSampleHandModal: true})
    } else this.setState({ toggleSampleHandModal: false})    
  }

  toggleAutoZoom = () => {
    if(this.state.enableHoverZoom === false) {
      this.setState({ enableHoverZoom: true })
    } else this.setState({ enableHoverZoom: false })
  }

  toggleShowTypes = () => {
    if(this.state.showTypes === false) {
      this.setState({ showTypes: true })
    } else this.setState({ showTypes: false })
  }

  handleViewChange(event) {
    this.setState({ viewType: event.target.value });
  }
  handleSortChange(event) {
    this.setState({ sortType: event.target.value });
  }

  render() {
    const sampleHand = this.state.toggleSampleHandModal 
    const minLengthMet = this.state.cubeContents.length > 15
    
    return (
      <>
      <div className="tempmain">
      <div className="App-header"  id="viewsettings">
    
        <Logo />
        <StatusLight text="View mode" light="view" />
      </div>      
      <SearchCard 
        loadCube={() => this.loadCube()} 
        cubeId={this.state.cubeId}
        hasControls={false}       
        viewType={this.state.viewType}   
      />
        <div className="view-header">
          <div className="view-header__titlebox">
            <h1>{this.state.cubename}</h1>
          </div>
          <h2 className="view-header__count">{this.state.cubeContents.length} cards | Maintained by {this.state.username} </h2>
          
          <div className="sortcontrol">
            <div className="sortcontrol-option">  
              <label className="sortcontrol-label">Show cube as</label>
              <select id="changeviewtype" value={this.state.viewType} onChange={this.handleViewChange}>
                <option value="list">List</option>
                <option value="card">Card spread</option>
              </select>
            </div>
            <div className="sortcontrol-option">  
              <label className="sortcontrol-label">Sort cards by</label>
              <select id="changesorttype" value={this.state.sortType} onChange={this.handleSortChange}>
                <option value="cmc">CMC</option>
                <option value="alphabetic">Alphabetic</option>
              </select>
            </div>
            <div className="sortcontrol-option ">
              <label className="sortcontrol-label">Zoom in on hover</label>
              <input 
                type="checkbox" 
                checked={this.state.enableHoverZoom}
                onChange={this.toggleAutoZoom}
              />              
            </div>
            <div className="sortcontrol-option ">
              <label className="sortcontrol-label">Separate card types</label>
              <input 
                type="checkbox" 
                checked={this.state.showTypes}
                onChange={this.toggleShowTypes}
              />              
            </div>
          </div>

          { minLengthMet && 
              <button className="buttonsecondary" onClick={(e) => this.toggleSampleHandModal(e)}>
                Sample Pack
              </button>
          }
          < ModalExportList 
            contents={this.state.cubeContents}
          />
        </div>
        {sampleHand && <ModalSampleHand 
          close={this.toggleSampleHandModal} 
          cubeContents={this.state.cubeContents}
          />}
        <div className="mixedspread-view">
          <MixedSpreadView 
            cubeContents={this.state.cubeContents}  
            loadCube={() => this.loadCube()}
            viewType={this.state.viewType}
            cubeId={this.state.cubeId}
            hasControls={false}
            sort={this.state.sortType}
            enableHoverZoom={this.state.enableHoverZoom}
            showTypes={this.state.showTypes}
            sortType={this.state.sortType}
          />
        </div>
      </div>
      <Footer />
      </>
    )
  }
}

export default CubeViewer;