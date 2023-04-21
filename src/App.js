import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")

  const getAllPokemons = async() => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    async function createPokemonObject(results) {
      results.forEach( async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`) 
        const data = await res.json()
        
        setAllPokemons(currentList => [...currentList, data]) // allPokemons.push(data)
        
        await console.log(allPokemons)
        
      })
    }

    createPokemonObject(data.results)

    console.log(data)
  }

  useEffect(() => {
    getAllPokemons()
  }, [])

  return (
    <div className="app-container">
      <h1>Hello to my Pokedex</h1>
      <div className="all-container">
        <button className="load-more">Load more</button>
      </div>
    </div>
  );
}

export default App;
