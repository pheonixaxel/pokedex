import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await res.json();
      setPokemonData(data);
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { name, id, sprites, types } = pokemonData;

  return (
    <div>
      <h2>{name}</h2>
      <img src={sprites.front_default} alt={name} />
      <p>ID: {id}</p>
      <p>Type: {types.map((type) => type.type.name).join(', ')}</p>
    </div>
  );
};