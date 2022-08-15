import './App.css';
import React, {useState, useEffect} from 'react';
import CharactersList from './CharacterComponents/CharactersList'
import CharacterDetails from './CharacterComponents/CharacterDetails'
import {getAll, getById} from './Services/charactersService';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Pagination from './NavigationComponents/Pagination.js';


const url = "https://swapi.dev/api/people/";


function App() {

  const [title, setTitle] = useState("Star Wars Character List");
  const [characters, setCharacters] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://swapi.dev/api/people/")
  const [currentPageNumber, setcurrentPageNumber] = useState(1)
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCharacters = async () => {
    let data = sessionStorage.getItem(`page_${currentPageNumber}`);
    if(data === null || data === '[]'){

        try {
          setLoading(true)
    
          const response = await fetch(currentPageUrl);
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          let actualData = await response.json();
    
          setCharacters(actualData.results);
          console.log(actualData.results)
          setLoading(false)
    
          setNextPageUrl(actualData.next)
          setPrevPageUrl(actualData.previous)
    
          setTotal(actualData.count)
    
          sessionStorage.setItem(`page_${JSON.stringify(currentPageNumber)}`, JSON.stringify(actualData));
    
          setError(null);
        } catch(err) {
          setError(err.message);
          setCharacters(null);
        } finally {
          setLoading(false);
        }  
    }else{
      let sessionCharacters = JSON.parse(data)
      setLoading(true)
      setCharacters(sessionCharacters.results);
      setLoading(false)

      setNextPageUrl(sessionCharacters.next)
      setPrevPageUrl(sessionCharacters.previous)
    
      setTotal(sessionCharacters.count)
    }
  }

  useEffect(() => {
    getCharacters()  
    
  }, [currentPageUrl])

  function gotoNextPage(){
    setcurrentPageNumber(currentPageNumber + 1)
    setCurrentPageUrl(nextPageUrl)
   }

   function gotoPrevPage(){
    setcurrentPageNumber(currentPageNumber - 1)
    setCurrentPageUrl(prevPageUrl)
   }

  if(loading) return "Loading..."

  return (
    <div className="App">
      <header className="App-header">
        <h1> {title}</h1>
      </header>
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        currentPageNumber={currentPageNumber}
        total={total}
      />
      <Router>
        <Routes >
          <Route path="/" element={<CharactersList characters={characters} />}></Route> 
          <Route path="/Character/:id" element={<CharacterDetails />}></Route> 
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
