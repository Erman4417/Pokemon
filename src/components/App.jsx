import {useState,useEffect} from 'react'
import ky from 'ky'
import './App.css'

function App() {

  let [Name,setName] = useState('')
  let [pokemonStatus, setPokemonStatus] = useState()
  let [pokemonShow, setPokemonShow] = useState(false)

  async function searchPokemon(){
    const todo = await ky.get(`https://pokeapi.co/api/v2/pokemon/${Name}`).json()
    setPokemonStatus(todo)
    setPokemonShow(true)
  }
  document.onkeydown = e =>{
    if(e.keyCode === 13){
      searchPokemon()
    }
  }
  
  return (
    <div className="App">
      <nav className='nav'>
        <span className='textPokemon'>Pokemon App</span> 
        <div className='searchPanel'>
            <input className='input' type='text' onChange={(e)=>{setName(e.target.value)}}/>
            <button  className='btn' onClick={searchPokemon} type='click'>Enter</button>
        </div>
      </nav>
      <div className='main'>
      {!pokemonShow ? <div className='hidePokemon'>What kind of pokemon do you like?</div>
        : <div className='showPokemon'>
              <div className='pokemonImg'>
                  <img src={pokemonStatus.sprites.front_default} alt={Name} />
              </div>
              <div className='pokemonStats'>
                <table className='table'>
                  <tr>
                    <th>Name:</th>
                    <td>{pokemonStatus.species.name}</td>
                  </tr>
                  <tr>
                    <th>HP:</th>
                    <td>{pokemonStatus.stats[0].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Attack:</th>
                    <td>{pokemonStatus.stats[1].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Speed:</th>
                    <td>{pokemonStatus.stats[5].base_stat}</td>
                  </tr>
                  <tr>
                    <th>Defense:</th>
                    <td>{pokemonStatus.stats[2].base_stat}</td>
                  </tr>
                </table>
              </div>
          </div>
      }
      </div>
    </div>
  )
}

export default App
