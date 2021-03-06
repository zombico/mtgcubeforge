import React from 'react';
import DynamicCard from './DynamicCard';
import DynamicListItem  from './DynamicListItem';
import AlphabeticSort  from './operations/AlphabeticSort';
import ConvertedManaSort  from './operations/ConvertedManaSort';
import GetStats from './operations/GetStats';
import ModalButtonStats from './ModalButtonStats';

const MixedSpreadView = (props) => {
  if (props.cubeContents && props.viewType === "list") {
    const filtered = props.cubeContents.filter(e => e.name && e.name !== null)
    const view = filtered.map(((card,index) => 
      
      <DynamicListItem 
        index={index}
        cubeId={props.cubeId}
        name={card.name} 
        nameFlip={card.nameFlip}
        src={card.imgsm}
        imgsmFlip={card.imgsmFlip} 
        tooltip={card.imgmd} 
        imgmdFlip={card.imgmdFlip}
        colors={card.colors}
        type={card.type}
        id={card.id} 
        oracleid={card.oracleid}
        cmc={card.cmc}
        manacost={card.manacost}
        layout={card.layout}
        aftermath={card.aftermath}
        loadCube={() => props.loadCube()}
        hasControls={props.hasControls}
        hoverEnabled={props.enableHoverZoom}
        isFoil={card.isFoil}
      />      
      
    ))
    
    

    const errantLands = view.filter(card => card.props.colors.length > 0 && card.props.type.includes("Land")).map((card) => card.props.id).toString()
    
    const multicolor = view.filter(card => card.props.colors.length > 1)
    const blue = view.filter(card => card.props.colors[0]=== "U" && card.props.colors.length === 1)
    const black = view.filter(card => card.props.colors[0]=== "B" && card.props.colors.length === 1)
    const white = view.filter(card => card.props.colors[0]=== "W" && card.props.colors.length === 1)
    const red = view.filter(card => card.props.colors[0]=== "R" && card.props.colors.length === 1 )
    const green = view.filter(card => card.props.colors[0]=== "G" && card.props.colors.length === 1)
    const colorless = view.filter(card => card.props.colors.length === 0 && !card.props.type.includes("Land"))
    const land = view.filter(card => card.props.type.includes("Land") && !errantLands.includes(card.props.id) )
    
    const azorius = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "U" && card.props.colors[1]=== "W")
    const boros = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "R" && card.props.colors[1]=== "W")
    const dimir = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "U")
    const golgari = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "G")
    const gruul = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "R")
    const izzet = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "R" && card.props.colors[1]=== "U")
    const orzhov = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "W")
    const rakdos = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "R")
    const selesnya = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "W")
    const simic = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "U")

    const abzan = multicolor.filter(card => card.props.colors.length === 3 && card.props.colors[0] === "B" && card.props.colors[1] === "G" && card.props.colors[2] === "W")
    const bant = multicolor.filter(card => card.props.colors.length === 3 && card.props.colors[0] === "G" && card.props.colors[1] === "U" && card.props.colors[2] === "W")
    const esper= multicolor.filter(card => card.props.colors.length === 3 && card.props.colors[0] === "B" && card.props.colors[1] === "U" && card.props.colors[2] === "W")
    const grixis = multicolor.filter(card => card.props.colors.length === 3 && card.props.colors[0] === "B" && card.props.colors[1] === "R" && card.props.colors[2] === "U")
    const jeskai = multicolor.filter(card => card.props.colors.length === 3 && card.props.colors[0] === "R" && card.props.colors[1] === "U" && card.props.colors[2] === "W")
    const jund = multicolor.filter(card => card.props.colors.length === 3 && card.props.colors[0] === "B" && card.props.colors[1] === "G" && card.props.colors[2] === "R")
    const mardu = multicolor.filter(card => card.props.colors.length === 3 && card.props.colors[0] === "B" && card.props.colors[1] === "R" && card.props.colors[2] === "W")
    const naya = multicolor.filter(card => card.props.colors.length === 3 && card.props.colors[0] === "G" && card.props.colors[1] === "R" && card.props.colors[2] === "W")
    const sultai = multicolor.filter(card => card.props.colors.length === 3 && card.props.colors[0] === "B" && card.props.colors[1] === "G" && card.props.colors[2] === "U")  
    const temur = multicolor.filter(card => card.props.colors.length === 3 && card.props.colors[0] === "G" && card.props.colors[1] === "R" && card.props.colors[2] === "U")
    
    const unalignedGold = multicolor.filter((card => card.props.colors.length > 3))
    const fourColor = multicolor.filter((card => card.props.colors.length === 4))
    const fourColorNoBlack = fourColor.filter(card => !card.props.colors.includes('B'))
    const fourColorNoBlue = fourColor.filter(card => !card.props.colors.includes('U'))
    const fourColorNoWhite = fourColor.filter(card => !card.props.colors.includes('W'))
    const fourColorNoRed = fourColor.filter(card => !card.props.colors.includes('R'))
    const fourColorNoGreen = fourColor.filter(card => !card.props.colors.includes('G'))
    const fiveColor = multicolor.filter((card => card.props.colors.length === 5))

    
    

    const colorSection = (color, colorstring) => (
      <>
      <div className={!color.length ? "hidden" : "dynamiclistitem__column"}>
        <div className="dynamiclistitem__column-mana centerizer">
        { color !== land && color !== multicolor &&          
          <img className="manasymbol" src={`/symbols/${colorstring.toLowerCase()}mana.svg`}  />          
        }
        {
          color === land &&
          <div className="manasymbol noimg noimg-inlist">L</div>
        }
        {
          color === multicolor &&
          <div className="manasymbol noimg noimg-inlist">M</div>
        }
        </div>
        {/* <h3 className="dynamiclistitem__header centerizer"  >{colorstring} <span>- {color.length}</span> </h3> */}
        <div className={"dynamiclistitem__listcontainer"}>                                
          {color !== multicolor && !props.showTypes && color}    
          { color !== multicolor && props.showTypes && typeSplitter(color, "Creature", "Creatures") }
          { color !== multicolor && props.showTypes && typeSplitter(color, "Planeswalker", "Planeswalkers") }          
          { color !== multicolor && props.showTypes && typeSplitter(color, "Instant", "Instants") }
          { color !== multicolor && props.showTypes && typeSplitter(color, "Sorcery", "Sorceries") }
          { color !== multicolor && props.showTypes && typeSplitter(color, "Enchantment", "Enchantments", "Artifact", "Creature") }
          { color !== multicolor && props.showTypes && typeSplitter(color, "Artifact", "Artifacts", "Creature") }
          { color !== multicolor && props.showTypes && typeSplitter(color, "Land", "Land") }

          { color===multicolor && shardSubSection(fiveColor, "", "white", "blue", "black", "red", "green")}
          { color===multicolor && shardSubSection(fourColorNoBlack, "", "red", "green", "white", "blue")}
          { color===multicolor && shardSubSection(fourColorNoWhite, "", "blue", "black", "green", "red")}
          { color===multicolor && shardSubSection(fourColorNoGreen, "", "white", "blue", "black", "red")}
          { color===multicolor && shardSubSection(fourColorNoBlue, "", "black", "red", "green","white")}
          { color===multicolor && shardSubSection(fourColorNoRed, "", "green","white", "blue","black",)}
          

          { color===multicolor && guildSubSection(azorius, "Azorius", "white", "blue")}
          { color===multicolor && guildSubSection(boros, "Boros", "red","white")}
          { color===multicolor && guildSubSection(dimir, "Dimir", "blue", "black")}
          { color===multicolor && guildSubSection(golgari, "Golgari", "black", "green")}
          { color===multicolor && guildSubSection(gruul, "Gruul", "red", "green")}
          { color===multicolor && guildSubSection(izzet, "Izzet", "blue", "red")}
          { color===multicolor && guildSubSection(orzhov, "Orzhov", "white", "black")}
          { color===multicolor && guildSubSection(rakdos, "Rakdos", "black", "red")}
          { color===multicolor && guildSubSection(selesnya, "Selesnya", "green", "white")}
          { color===multicolor && guildSubSection(simic, "Simic", "green","blue")}
          
          { color===multicolor && shardSubSection(abzan, "Abzan", "white", "black", "green")}
          { color===multicolor && shardSubSection(bant, "Bant", "green", "white", "blue")}
          { color===multicolor && shardSubSection(esper, "Esper", "white", "blue", "black" )}
          { color===multicolor && shardSubSection(grixis, "Grixis", "blue", "black", "red" )}
          { color===multicolor && shardSubSection(jeskai, "Jeskai", "blue", "red", "white")}
          { color===multicolor && shardSubSection(jund, "Jund", "black", "red", "green")}
          { color===multicolor && shardSubSection(mardu, "Mardu", "red", "white", "black")}
          { color===multicolor && shardSubSection(naya, "Naya", "red", "green", "white")}
          { color===multicolor && shardSubSection(sultai, "Sultai", "black", "green", "blue")}
          { color===multicolor && shardSubSection(temur, "Temur", "green", "blue", "red")}
      
        </div>        
      </div>      
      </>
    )

    const typeSplitter = (color, typestring, displayname, excludetype, excludetype1) => (      
      <>      
      <div className={color.filter(card => card.props.type.includes(typestring) && !card.props.type.includes(excludetype) && !card.props.type.includes(excludetype1)).length ?"dynamiclistitem__column-typehead" : "hidden"}> {displayname}</div>
      {typeSplitter.array = color.filter(card => card.props.type.includes(typestring) && !card.props.type.includes(excludetype) && !card.props.type.includes(excludetype1))}
      </>
    )
    
    const shardSubSection = (color, colorstring, color1, color2, color3, color4, color5) => (
      <div className={!color.length ? "hidden" : "dynamiclistitem__guild"}>
        <div className="dynamiclistitem__column-typehead">
        {
          color1 &&
        <>
        <img className="manasymbol smaller shard" src={`/symbols/${color1}mana.svg`} alt={`${color1}manasymbol`} /> 
        <img className="manasymbol smaller shard" src={`/symbols/${color2}mana.svg`} alt={`${color2}manasymbol`} /> 
        <img className="manasymbol smaller shard" src={`/symbols/${color3}mana.svg`} alt={`${color3}manasymbol`} /> 
        {color4 && <img className="manasymbol smaller shard" src={`/symbols/${color4}mana.svg`} alt={`${color4}manasymbol`} />  }
        {color5 && <img className="manasymbol smaller shard" src={`/symbols/${color5}mana.svg`} alt={`${color5}manasymbol`} />  }
        </>
        }
          {colorstring}
        </div>
        {color}
      </div>
    )

    const guildSubSection = (guild, guildstring, color1, color2) => (
      <div className={!guild.length ? "hidden" : "dynamiclistitem__guild"}>
        <div className="dynamiclistitem__column-typehead">
        <img className="manasymbol smaller shard" src={`/symbols/${color1}mana.svg`} alt={`${color1}manasymbol`} /> 
        <img className="manasymbol smaller shard" src={`/symbols/${color2}mana.svg`} alt={`${color2}manasymbol`} /> 
        {/* <img className="manasymbol smaller" src={`/symbols/${guildstring.toLowerCase()}mana.svg`} alt={`${guildstring.toLowerCase()}manasymbol`} />  */}
          {guildstring}
        </div>
        {guild}
      </div>
    )

    AlphabeticSort(multicolor, blue, black, white, red, green, colorless, land) 
    props.sort === 'cmc' && ConvertedManaSort(multicolor, blue, black, white, red, green, colorless, land)

    const stats = {}
      stats.all = GetStats(view)
      stats.multicolor = GetStats(multicolor)
      stats.blue = GetStats(blue)
      stats.black = GetStats(black)
      stats.white = GetStats(white)
      stats.red = GetStats(red)
      stats.green = GetStats(green)
      stats.colorless = GetStats(colorless)
      stats.land = GetStats(land)

    
  return <>
    <div className="statsTable__listbuttoncontainer"> <ModalButtonStats color="all" display="button" stats={stats} /></div>
    <div className="dynamiclistitem__container">
    <div className="dynamiclistitem">
      {colorSection(multicolor, "Multicolor")}
    </div> 
    <div className="dynamiclistitem">
      {colorSection(blue, "Blue")}
      
    </div>
    <div className="dynamiclistitem">
      {colorSection(black, "Black")}
      
    </div>
    <div className="dynamiclistitem">
      {colorSection(white, "White")}
      
    </div>
    <div className="dynamiclistitem">
      {colorSection(red, "Red")}
      
    </div>
    <div className="dynamiclistitem">
      {colorSection(green, "Green")}
      
    </div>
    <div className="dynamiclistitem">
      {colorSection(colorless, "Colorless")}
      
    </div>
    <div className="dynamiclistitem">
      {colorSection(land, "Land")}
      
    </div>
        </div>
        </>
  } 
  



  if (props.cubeContents && props.viewType === "card") {
    const filtered = props.cubeContents.filter(e => e.name && e.name !== null)
    const view = filtered.map(((card,index) => 
    
    <DynamicCard 
      index={index}     
      cubeId={props.cubeId}
      name={card.name} 
      nameFlip={card.nameFlip}
      src={card.imgsm}
      imgsmFlip={card.imgsmFlip} 
      tooltip={card.imgmd} 
      imgmdFlip={card.imgmdFlip}
      colors={card.colors}
      type={card.type}
      id={card.id} 
      oracleid={card.oracleid}
      cmc={card.cmc}
      manacost={card.manacost}
      isFoil={card.isFoil}
      layout={card.layout}
      aftermath={card.aftermath}
      loadCube={() => props.loadCube()}
      hasControls={props.hasControls}      
      hoverEnabled={props.enableHoverZoom}
    />
    ))
    const errantLands = view.filter(card => card.props.colors.length > 0 && card.props.type.includes("Land")).map((card) => card.props.id).toString()

    const multicolor = view.filter(card => card.props.colors.length > 1)
    const blue = view.filter(card => card.props.colors[0]=== "U" && card.props.colors.length === 1)
    const black = view.filter(card => card.props.colors[0]=== "B" && card.props.colors.length === 1)
    const white = view.filter(card => card.props.colors[0]=== "W" && card.props.colors.length === 1)
    const red = view.filter(card => card.props.colors[0]=== "R" && card.props.colors.length === 1 )
    const green = view.filter(card => card.props.colors[0]=== "G" && card.props.colors.length === 1)
    const colorless = view.filter(card => card.props.colors.length === 0 && !card.props.type.includes("Land"))
    const land = view.filter(card => card.props.type.includes("Land") && !errantLands.includes(card.props.id) )
    
    const azorius = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "U" && card.props.colors[1]=== "W")
    const boros = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "R" && card.props.colors[1]=== "W")
    const dimir = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "U")
    const golgari = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "G")
    const gruul = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "R")
    const izzet = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "R" && card.props.colors[1]=== "U")
    const orzhov = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "W")
    const rakdos = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "B" && card.props.colors[1]=== "R")
    const selesnya = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "W")
    const simic = multicolor.filter(card => card.props.colors.length === 2 && card.props.colors[0]=== "G" && card.props.colors[1]=== "U")

    const fourColor = multicolor.filter((card => card.props.colors.length === 4))
    const fiveColor = multicolor.filter((card => card.props.colors.length === 5))
    const unalignedGold = multicolor.filter((card => card.props.colors.length > 2))
    
    
    props.sort === 'alphabetic' && AlphabeticSort(multicolor, blue, black, white, red, green, colorless, land) 
    props.sort === 'cmc' && ConvertedManaSort(multicolor, blue, black, white, red, green, colorless, land)

    const containerClass = view.length > 500 ? "dynamiccard__color large" : "dynamiccard__color"
    const colorSection = (color, colorstring) => (
      <div className={!color.length ? "hidden" : ""}>       
        <h3 className="dynamiccard__header"  >{colorstring} <span>- {color.length}</span> </h3>
        <div className={containerClass}>                                
          {color}
          <button className="newcardholder" id={`newcardholder${colorstring}`} />
        </div>
      </div>
    )
    const guild = (guild) => (<>{guild}</>)

    const stats = {}
      stats.all = GetStats(view)
      stats.multicolor = GetStats(multicolor)
      stats.blue = GetStats(blue)
      stats.black = GetStats(black)
      stats.white = GetStats(white)
      stats.red = GetStats(red)
      stats.green = GetStats(green)
      stats.colorless = GetStats(colorless)
      stats.land = GetStats(land)
    

  return <div className="dynamiccard__container">            
            <ModalButtonStats color="all" display="button" stats={stats} />
            <br></br>
            <div id="Multicolorsection" className="dynamiccard__color-spacer" />
            <h3 className="dynamiccard__header">Multicolor</h3>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {guild(unalignedGold)}
              {guild(azorius)}
              {guild(boros)}
              {guild(dimir)}
              {guild(golgari)}
              {guild(gruul)}
              {guild(izzet)}
              {guild(orzhov)}
              {guild(rakdos)}
              {guild(selesnya)}
              {guild(simic)}
            </div>
            
            <div id="Bluesection" className="dynamiccard__color-spacer" />
            {colorSection(blue, 'Blue')}
            <div id="Blacksection" className="dynamiccard__color-spacer" />
            {colorSection(black, 'Black')}
            <div id="Whitesection" className="dynamiccard__color-spacer" />
            {colorSection(white, 'White')}
            <div id="Redsection" className="dynamiccard__color-spacer" />
            {colorSection(red, 'Red')}
            <div id="Greensection" className="dynamiccard__color-spacer" />
            {colorSection(green, 'Green')}
            <div id="Colorlesssection" className="dynamiccard__color-spacer" />
            {colorSection(colorless, 'Colorless')}
            <div id="Landsection" className="dynamiccard__color-spacer" />
            {colorSection(land, 'Land')}
                       
            { props.cubeContents.length === 0 && 
            <p className="mixedspread-view__emptymsg">Use the search bar to find cards to add to your cube</p>}
          </div>  } 
  
  else { return '' }  
  

  
}





export default MixedSpreadView;