import './App.css';
import React from 'react';
import { useEffect, useState } from "react";
import PokemonCards from './components/pokemonCards';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { PokemonDetails } from './components/PokemonDetails';

function App() {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")
  const [prev, setPrevPage] = useState(' ')

  const getAllPokemons = async(link) => {
    const res = await fetch(link)
    const data = await res.json()

    setLoadMore(data.next)
    setPrevPage(data.previous)

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const data = await res.json();
      return data;
    });

    Promise.all(promises).then((pokemonData) => {
      const orderedPokemon = pokemonData.sort((a, b) => a.id - b.id);
      setAllPokemons(orderedPokemon);
    });
  }

  useEffect(() => {
    getAllPokemons(loadMore)
  }, [])

  return (
    <div className='app-container'>
      <h1>Pokedex</h1>
      
      <div className='pokemon-container'>
        <div className='all-container'>
          {allPokemons.map((pokemon, index)=> 
            <PokemonCards
              id = {pokemon.id}
              name = {pokemon.name}
              image = {pokemon.sprites.front_default}
              type={pokemon.types[0].type.name}
              key={index}
            />
          )}
        </div>
        <button className='load-more' onClick={() => getAllPokemons(loadMore)}>Load more</button>
        <button className='load-more' onClick={() => getAllPokemons(prev)}>Previous</button>
      </div>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}

export default App;