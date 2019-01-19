import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route,  Link } from "react-router-dom"
import Logo from './buttons/Logo'
import MixedSpreadView from './MixedSpreadView';
import SearchCard from './SearchCard'
import ModalSampleHand from './ModalSampleHand';

class CubeViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeId: 'banana',
      cubename: 'Loading cube...',
      cubeContents : [],
      hasError: false,
      viewType: "card",
      username: "",
      toggleSampleHandModal: false
    }
  this.loadCube = this.loadCube.bind(this);  
  this.toggleSampleHandModal = this.toggleSampleHandModal.bind(this)
  }
  
  async componentWillMount() {
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
  

  render() {
    const sampleHand = this.state.toggleSampleHandModal 
    const minLengthMet = this.state.cubeContents.length > 15
    
    return (
      <div className="tempmain">
      <div className="App-header"  id="viewsettings">
    
        <Logo />

      </div>      
      <SearchCard 
          loadCube={() => this.loadCube()} 
          cubeId={this.state.cubeId}
          hasControls={false}          
        />
        <div className="view-header">
          <h1>{this.state.cubename}</h1>
          <h2>Maintained by {this.state.username}</h2>
          <h2 className="view-header__count" id="multicolorsection">{this.state.cubeContents.length} cards</h2>
          { minLengthMet && 
              <button className="buttontransparent" onClick={(e) => this.toggleSampleHandModal(e)}>
                Sample Pack
              </button>
          }
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
            sort={'alphabetic'}
          />
        </div>
      </div>
    )
  }
}

export default CubeViewer;