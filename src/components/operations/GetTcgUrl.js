function getUrl(query) {
  // console.log(query)
  const array = query.split(' ')
  array.filter(e => e !== "Limited" && e !== "Edition")
  const filtered = array.filter(e => e !== "Limited" && e !== "Edition")
  // console.log(filtered)
  filtered.push('MTG')
  const keyed = filtered.map((e, index) => {
    if (index === 0) return `${e}`
    else return `%20${e}`
  })
  const q = keyed.join('')
  // console.log(ebay)
  const url = `https://www.tcgplayer.com/search/all/product?q=${q}&utm_campaign=affiliate&utm_medium=MtgCubeForge&utm_source=MtgCubeForge`
  return url
}

export default getUrl