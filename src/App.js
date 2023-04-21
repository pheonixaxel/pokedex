import './App.css';
import { useEffect, useState } from "react";
import PokemonCards from './components/pokemonCards';

function App() {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")
  const [prev, setPrevPage] = useState(' ')

  const getAllPokemons = async(link) => {
    const res = await fetch(link)
    const data = await res.json()

    setLoadMore(data.next)
    setPrevPage(data.previous)

    // async function createPokemonObject(results) {
    //   results.forEach( async (pokemon) => {
    //     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`) 
    //     const data = await res.json()
        
    //     setAllPokemons(currentList => [...currentList, data]) // allPokemons.push(data)
                

    //   })

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

    //createPokemonObject(data.results)
    //await console.log(allPokemons)
  

  useEffect(() => {
    getAllPokemons(loadMore)
  }, [])

  return (

    <div className='app-container'>
      <h1>Pokedex</h1>
      
      <div className='pokemon-container'>
        <div className='all-container'>
          {
            allPokemons.map((pokemon, index)=> 
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
    </div>
    // <div>
    //   {allPokemons.map((pokemon, index) => (
    //     <div key={index}>
    //       <p>{pokemon.name}</p>
    //     </div>
    //   ))}
    // </div>
    );
}
export default App;
