const ConvertedManaSort = (multicolor, blue, black, white, red, green, colorless, land) => {


const sortmulticolor = multicolor.sort(function(a,b){
  let nameA = a.props.cmc, nameB = b.props.cmc
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortblue = blue.sort(function(a,b){
  let nameA = a.props.cmc, nameB = b.props.cmc
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortblack = black.sort(function(a,b){
  let nameA = a.props.cmc, nameB = b.props.cmc
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortwhite = white.sort(function(a,b){
  let nameA = a.props.cmc, nameB = b.props.cmc
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortred = red.sort(function(a,b){
  let nameA = a.props.cmc, nameB = b.props.cmc
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortgreen = green.sort(function(a,b){
  let nameA = a.props.cmc, nameB = b.props.cmc
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortcolorless = colorless.sort(function(a,b){
  let nameA = a.props.cmc, nameB = b.props.cmc
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
const sortland = land.sort(function(a,b){
  let nameA = a.props.cmc, nameB = b.props.cmc
  
  if (nameA < nameB) 
    return -1 
  if (nameA > nameB)
    return 1
  return 0 
})
}

export default ConvertedManaSort
