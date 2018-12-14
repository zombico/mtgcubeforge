import React from 'react';
import DynamicCard from './DynamicCard';
import DynamicListItem  from './DynamicListItem';

const MixedSpreadView = (props) => {
  console.log(props)
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
  
  else if (props.cubeContents && props.viewType === "card") {
    
    const view = props.cubeContents.map((card => 
    <DynamicCard
      cubeId={props.cubeId}
      src={card.imgsm} alt={card.name} 
      tooltip={card.imgmd} 
      id={card.id} 
      loadCube={() => props.loadCube()}
    />
    ))
  return <div className="dynamiccard__container">
            {view}
            <button id="newcardholder" />
          </div> } 
  
  else { return '' }  
  

  
}






export default MixedSpreadView;