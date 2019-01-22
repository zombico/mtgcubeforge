
const GetStats = (color) => {
  let stats = {}
  
  stats.totalCards = color.length
  stats.planeswalkers = color.filter(card => card.props.type.includes("Planeswalker")).length 
  stats.creatures = color.filter(card => card.props.type.includes("Creature")).length
  stats.instants = color.filter(card => card.props.type.includes("Instant")).length 
  stats.sorceries = color.filter(card => card.props.type.includes("Sorcery")).length 
  stats.enchantments = color.filter(card => card.props.type.includes("Enchantment") && !card.props.type.includes("Creature") && !card.props.type.includes("Artifact")).length 
  stats.artifacts = color.filter(card => card.props.type.includes("Artifact") && !card.props.type.includes("Creature") && !card.props.type.includes("Land")).length
  stats.equipments = color.filter(card => card.props.type.includes("Equipment")).length 
  stats.vehicle = color.filter(card => card.props.type.includes("Vehicle")).length
  stats.land = color.filter(card => card.props.type.includes("Land")).length
  stats.totalNonCreature = stats.totalCards - stats.creatures

  stats.by0cc = color.filter(card => card.props.cmc === 0 ).length
  stats.by1cc = color.filter(card => card.props.cmc === 1 ).length
  stats.by2cc = color.filter(card => card.props.cmc === 2 ).length
  stats.by3cc = color.filter(card => card.props.cmc === 3 ).length
  stats.by4cc = color.filter(card => card.props.cmc === 4 ).length
  stats.by5cc = color.filter(card => card.props.cmc === 5 ).length
  stats.by6cc = color.filter(card => card.props.cmc === 6 ).length
  stats.by7ccplus = color.filter(card => card.props.cmc > 6 ).length
  return (
    stats
  )
}

export default GetStats