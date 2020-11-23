function getUrl(query) {
  // console.log(query)
  const array = query.split(' ')
  array.filter(e => e !== "Limited" && e !== "Edition")
  const filtered = array.filter(e => e !== "Limited" && e !== "Edition")
  // console.log(filtered)
  filtered.push('MTG')
  const keyed = filtered.map((e, index) => {
    if (index === 0) return `%3D${e}`
    else return `%2B${e}`
  })
  const ebay = keyed.join('')
  // console.log(ebay)
  const url = `https://rover.ebay.com/rover/1/711-53200-19255-0/1?mpre=https%3A%2F%2Fwww.ebay.com%2Fsch%2Fi.html%3F_from%3DR40%26_trksid%3Dp2380057.m570.l1313%26_nkw${ebay}%26_sacat%3D0&campid=5338460844&toolid=10001&customid=`
  return url
}

export default getUrl