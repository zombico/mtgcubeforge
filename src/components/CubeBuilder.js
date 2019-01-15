import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCube } from '@fortawesome/free-solid-svg-icons'
import Logo from './buttons/Logo'
import SearchCard from './SearchCard';
import ToolTip from './ToolTip';
import MixedSpreadView from './MixedSpreadView';
import ModalMassUpload from './ModalMassUpload';
import axios from "axios";

class CubeBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeId: 'banana',
      cubename: 'Loading cube...',
      cubeContents: [],
      hasError: false,
      viewType: "card",
      username: "",
      showMassUpload: false
    }
  this.loadCube = this.loadCube.bind(this);  
  this.toggleMassUploadModal = this.toggleMassUploadModal.bind(this);
  }
  
  async componentWillMount() {
    const cubeId = this.props.location.pathname.split('/')[2]
    
    
    await this.setState({ cubeId })
    this.loadCube();
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

  
  toggleMassUploadModal = () => {
   
    if (this.state.showMassUpload === false) {
      this.setState({ showMassUpload: true })
    } else this.setState({ showMassUpload: false })
    this.loadCube()
  }

  render() {
    const showMassUpload = this.state.showMassUpload
    return (
      <div className="tempmain">
      <div className="App-header">
        <Logo />
        {/* <Link to="/dashboard" className="App-header__builder">
          <FontAwesomeIcon icon={faUser} />
          <span className="App-header__builder-user">{this.state.username}</span>
        </Link>  */}
      </div>
        <SearchCard 
          loadCube={() => this.loadCube()} 
          cubeId={this.state.cubeId}
          hasControls={true}
        />
        <div className="view-header" >
          <h1 ><FontAwesomeIcon icon={faCube} /> {this.state.cubename}</h1>
          <h2 className="view-header__count" id="multicolorsection">{this.state.cubeContents.length} cards</h2>
          <button className="buttontransparent" onClick={this.toggleMassUploadModal}>Upload List</button>
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
    )
  }
}

export default CubeBuilder;