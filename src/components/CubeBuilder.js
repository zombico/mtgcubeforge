import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import Logo from './buttons/Logo'
import SearchCard from './SearchCard';
import StatusLight from './buttons/StatusLight'
import MixedSpreadView from './MixedSpreadView';
import ModalMassUpload from './ModalMassUpload';
import ModalSampleHand from './ModalSampleHand'
import Footer from './Footer'


class CubeBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeId: 'banana',
      cubename: 'Loading cube...',
      cubeContents: [],
      hasError: false,
      viewType: "list",
      sortType: "cmc",
      enableHoverZoom: false,
      showTypes: true,
      username: "...",
      showMassUpload: false,
      toggleSampleHandModal: false
    }
  this.loadCube = this.loadCube.bind(this);  
  this.toggleMassUploadModal = this.toggleMassUploadModal.bind(this);
  this.handleViewChange = this.handleViewChange.bind(this)
  this.handleSortChange = this.handleSortChange.bind(this)
  this.toggleAutoZoom = this.toggleAutoZoom.bind(this)
  this.toggleShowTypes = this.toggleShowTypes.bind(this)
  }
  
  async componentWillMount() {
    
    const cubeId = this.props.location.pathname.split('/')[2]
    
    
    await this.setState({ cubeId })
    this.loadCube();
    document.getElementById("viewsettings").scrollIntoView()
  }

  async loadCube() {
    try {
      const response = await axios.get(`/cubes/${this.state.cubeId}`)
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
  
  toggleMassUploadModal = () => {
   
    if (this.state.showMassUpload === false) {
      this.setState({ showMassUpload: true })
    } else this.setState({ showMassUpload: false })
    this.loadCube()
  }

  handleViewChange(event) {
    this.setState({ viewType: event.target.value });
  }
  handleSortChange(event) {
    console.log('i changed')
    this.setState({ sortType: event.target.value });
  }
  toggleShowTypes = () => {
    if(this.state.showTypes === false) {
      this.setState({ showTypes: true })
    } else this.setState({ showTypes: false })
  }
  toggleAutoZoom = () => {
    if(this.state.enableHoverZoom === false) {
      this.setState({ enableHoverZoom: true })
    } else this.setState({ enableHoverZoom: false })
  }

  render() {
    const showMassUpload = this.state.showMassUpload
    const sampleHand = this.state.toggleSampleHandModal 
    const minLengthMet = this.state.cubeContents.length > 15
    return (
      <>
      <div className="tempmain">
      <div className="App-header" id="viewsettings">
        <Logo />
        <StatusLight text="Now editing" light="edit" />        
      </div>
        <SearchCard 
          loadCube={() => this.loadCube()} 
          cubeId={this.state.cubeId}
          hasControls={true} 
          viewType={this.state.viewType}
        />
        <div className="view-header" >
          <h1 ><FontAwesomeIcon icon={faCube} /> {this.state.cubename}</h1>
          <h2 className="view-header__count" id="multicolorsection">{this.state.cubeContents.length} cards</h2>
          
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
            <div className="sortcontrol-option">
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

          <div className="">
          <button className="buttonprimary primarysmaller" onClick={this.toggleMassUploadModal}>Upload List</button>
          { minLengthMet && 
              <button className="buttontransparent primarysmaller" onClick={(e) => this.toggleSampleHandModal(e)}>
                Sample Pack
              </button>
          }
          </div>
        {sampleHand && 
        <ModalSampleHand 
          close={this.toggleSampleHandModal} 
          cubeContents={this.state.cubeContents}
        />}  
        {showMassUpload && 
        <ModalMassUpload 
          cubeId={this.state.cubeId} 
          close={this.toggleMassUploadModal}
          loadCube={() => this.loadCube()} 
        /> }
        </div>        
        <div className="mixedspread-view" >          
          <MixedSpreadView 
            cubeContents={this.state.cubeContents}  
            loadCube={() => this.loadCube()}
            viewType={this.state.viewType}
            cubeId={this.state.cubeId}
            hasControls={true}
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

export default CubeBuilder;