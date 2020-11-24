import React, { Component } from 'react';
import axios from "axios";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import Logo from './buttons/Logo'
import SearchCard from './SearchCard';
import Forge from './ForgeCardObject';
import StatusLight from './buttons/StatusLight'
import ListLoadAnimation from './ListLoadAnimation'
import MixedSpreadView from './MixedSpreadView';
import ModalMassUpload from './ModalMassUpload';
import ModalExportList from './ModalExportList'
import ModalSampleHand from './ModalSampleHand'
import Footer from './Footer'
import ToolTip from './ToolTipSmall';


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
      toggleSampleHandModal: false,
      stateReqstCard: '',
      stateReqstList: [],
      isSubmitting: false,
      copied: false      
    }
  this.loadCube = this.loadCube.bind(this);  
  this.refreshImages = this.refreshImages.bind(this);
  this.confirmRefresh = this.confirmRefresh.bind(this);
  this.cancelRefresh = this.cancelRefresh.bind(this);
  this.removeCard = this.removeCard.bind(this);  
  this.getCard = this.getCard.bind(this);
  this.toggleMassUploadModal = this.toggleMassUploadModal.bind(this);
  this.handleViewChange = this.handleViewChange.bind(this)
  this.handleSortChange = this.handleSortChange.bind(this)
  this.toggleAutoZoom = this.toggleAutoZoom.bind(this)
  this.toggleShowTypes = this.toggleShowTypes.bind(this)
  }
  
  async componentDidMount() {    
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

  getCard(id) {
    fetch(`https://api.scryfall.com/cards/${id}`, {
    })
    .then(res => res.json())
    .then(result => {        
      const newCard = result.id && Forge(result)      
      this.setState({ stateReqstCard: newCard })  
      const newRqstList = [...this.state.stateReqstList]
      newRqstList.push(newCard)            
      console.log('added', newRqstList)
      this.setState({ stateReqstList: newRqstList})
    })
    
  }  

  async refreshImages() {    
    const cubeList = this.state.cubeContents;    
    const list =  cubeList.map(card =>(card.id) )
        
    list.forEach(element => {
      element.length > 0 && setTimeout(this.getCard(element), 300)
    })          
    this.setState({
      isSubmitting: true 
    })  
  } 
  
  async confirmRefresh() {
    const newCube = {}
    newCube.contents = this.state.stateReqstList
    try {
      axios.patch(`/cubes/${this.state.cubeId}/overwrite`, newCube)      
    }catch(e) {
      
    }        
    this.setState({
      isSubmitting: false 
    })       
  }

  cancelRefresh() {
    this.loadCube()
    this.setState({
      stateReqstList: [],
      isSubmitting: false
    })
    
  }

  removeCard(card) {    
    console.log('removing', card)
    const remove = {}
    remove.id = card
    try {
      axios.patch(`/cubes/${this.state.cubeId}/remove`, remove)
    } catch (e) {
      console.log(e)
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
    const viewurl = `https://www.mtgcubeforge.com/cubeviewer/${this.state.cubeId}`
    return (
      <>
      <div className="tempmain">
      <div className="App-header" id="viewsettings">
        <Logo />
        <StatusLight text="Now editing" light="edit" />      
        <CopyToClipboard text={viewurl}
          onCopy={() => this.setState({copied: true})}>
          <div className="tooltip-small-container"> 
          <ToolTip 
            text="Copy link to clipboard"
            contents={
            <a href="#" style={{marginLeft: 20}}>
              <StatusLight text="Share" light="draft" noLight={true} />  
            </a>
            }
          />
          </div>
        </CopyToClipboard>   
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
          < ModalExportList 
            contents={this.state.cubeContents}
          />
          { minLengthMet && 
              <button className="buttontransparent primarysmaller" onClick={(e) => this.toggleSampleHandModal(e)}>
                Sample Pack
              </button>
          }
          {/* <button className="buttontransparent primarysmaller" onClick={(e) => this.refreshImages(e)} >Refresh Images</button> */}
          { this.state.stateReqstList.length > 0 &&
          <div className="modal__overlay">
            <div className="modal__newcube massupload"> 
            
            <div>
            { this.state.isSubmitting && 
              <button className="buttonprimary primarysmaller" onClick={(e) => this.confirmRefresh(e)} >Confirm Refresh</button>
            }
              <button className="buttontransparent primarysmaller" onClick={(e) => this.cancelRefresh(e)} >Return to Cube</button>            
            </div>
            
            </div>
          </div>
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