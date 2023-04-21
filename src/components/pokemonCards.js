import React from 'react'
import { Link } from 'react-router-dom';
const PokemonCards = ({id, name, image, type}) => {

  const style = `thumb-container ${type}`

  return (
    <Link to={`/pokemon/${name}`} style={{textDecoration: "none", color: "brown"}}>
      <div className={style}>
        <div className='number'>
          <small>#{id}</small>
        </div>
        <img src={image} alt={name} />
        <div className='detail-wrapper'>
          <h3>{name}</h3>
          <small>Type: {type}</small>
        </div>
      </div>
    </Link>
  )
}

export default PokemonCards;