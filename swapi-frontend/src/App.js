import './App.css';
import React, {useState, useEffect} from 'react';
import CharactersList from './CharacterComponents/CharactersList'
import CharacterDetails from './CharacterComponents/CharacterDetails'
import {getAll, getById} from './Services/charactersService';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


const url = "https://swapi.dev/api/people/";


function App() {

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCharacters = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      console.log(actualData.results)
      setCharacters(actualData.results);
      setError(null);
    } catch(err) {
      setError(err.message);
      setCharacters(null);
    } finally {
      setLoading(false);
    }  
  }

  useEffect(() => {
    getCharacters()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1> Star Wars Characters</h1>
      </header>
      <Router>
        <Routes >
          <Route path="/" element={<CharactersList characters={characters} />}></Route> 
          <Route path="/CharacterDetails/:id" element={<CharacterDetails />}></Route> 
        </Routes>
        {/* <CharactersList characters={characters} /> */}
      </Router>
    </div>
  );
}

export default App;
