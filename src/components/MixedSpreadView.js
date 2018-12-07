import React from 'react';
import DynamicCard from './DynamicCard';
import DynamicListItem  from './DynamicListItem';

const MixedSpreadView = (props) => {
  if (props.cubeContents.data && props.viewType === "list") {
    const view = props.cubeContents.data.map((card => 
      <>
      <div className="dynamiclistitem">
      <DynamicListItem 
        name={card.name} 
        tooltip={card.imgmd} 
        id={card.id} 
        loadCube={() => props.loadCube()}
      />
      </div>
      </>
    )) 
  return view } 
  
  else if (props.cubeContents.data && props.viewType === "card") {
    const view = props.cubeContents.data.map((card => 
    <DynamicCard 
      src={card.imgsm} alt={card.name} 
      tooltip={card.imgmd} 
      id={card.id} 
      loadCube={() => props.loadCube()}
    />
    ))
  return view } 
  
  else {return ''}  
  

  
}






export default MixedSpreadView;