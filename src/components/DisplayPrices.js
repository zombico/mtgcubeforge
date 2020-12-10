import React from 'react'

const DisplayPrices = (array) => {
  if (array.length === 0) return null
  // console.log(array)
  const regUsd = array.filter(e => e[0] === 'usd')[0][1]
  const regEur = array.filter(e => e[0] === 'eur')[0][1]
  const foilUsd = array.filter(e => e[0] === 'usd_foil')[0][1]
  const foilEur = array.filter(e => e[0] === 'eur_foil')[0][1]
  const hasFoil = foilUsd || foilEur
  const hasReg = regUsd || regEur
  if (!regUsd && !regEur && !foilUsd && !foilEur) return (<div></div>)
  else return (
    <>
    <section className="prices-container">
      {hasFoil && <div className="prices-finish prices-foil">
      <div>Foil</div>
      {foilUsd && <div className="prices-price">${foilUsd}</div>}
      {foilEur && <div className="prices-price">€{foilEur}</div>}
      </div>}

      {hasReg && <div className="prices-finish">
      <div>Regular</div>
      {regUsd && <div className="prices-price">${regUsd}</div>}
      {regEur && <div className="prices-price">€{regEur}</div>}
      </div>}
    </section>
    <div className="prices-disclaimer">TCGPlayer market</div>
    </>
  )
}

export default DisplayPrices