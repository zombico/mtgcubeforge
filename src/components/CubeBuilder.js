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
      viewType: "card",
      username: "...",
      showMassUpload: false,
      toggleSampleHandModal: false
    }
  this.loadCube = this.loadCube.bind(this);  
  this.toggleMassUploadModal = this.toggleMassUploadModal.bind(this);
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
        />
        <div className="view-header" >
          <h1 ><FontAwesomeIcon icon={faCube} /> {this.state.cubename}</h1>
          <h2 className="view-header__count" id="multicolorsection">{this.state.cubeContents.length} cards</h2>
          <div className="dashboard__panel">
          <button className="buttonprimary" onClick={this.toggleMassUploadModal}>Upload List</button>
          { minLengthMet && 
              <button className="buttontransparent" onClick={(e) => this.toggleSampleHandModal(e)}>
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
            sort={'alphabetic'}
          />                     
        </div>
      </div>
      <Footer />
      </>
    )
  }
}

export default CubeBuilder;