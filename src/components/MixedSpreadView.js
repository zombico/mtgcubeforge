import React from 'react';
// import DynamicCard from './DynamicCard';
import DynamicList from './DynamicList';

const MixedSpreadView = (props) => {
  console.log(props.cubeContents.data)
  if (props.cubeContents.data ) {
    const view = props.cubeContents.data.map((card => 
      
      // <img className="mixedspread-view__img" src={card.imgsm} alt={card.name}/>
      <>
      {/* <DynamicCard 
        src={card.imgsm} alt={card.name} 
        tooltip={card.imgmd} 
        id={card.id} 
        loadCube={() => props.loadCube()}
        /> */}
      <DynamicList 
        name={card.name} 
        tooltip={card.imgmd} 
        id={card.id} 
        loadCube={() => props.loadCube()}
        />
      </>
    ))
    return view
  } else {return ''}

  
}






export default MixedSpreadView;