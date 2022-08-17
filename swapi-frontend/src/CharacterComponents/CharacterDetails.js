import React, {useState, useEffect, useContext} from 'react';
import { useParams} from "react-router-dom";
import Loading from '../NavigationComponents/Loading';
import BackToList from '../NavigationComponents/BackToList';

import './CharacterDetails.css';

const url = "https://swapi.dev/api/people/";
const imgURL = 'https://starwars-visualguide.com/assets/img/characters/'



function CharacterDetail (){

  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const urlDetails = url + id; 

  const getCharacterDetails = async () => {

  let data = sessionStorage.getItem(`id_${id}`);
    if(data === null || data === '[]'){
      try {
        const response = await fetch(urlDetails);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setCharacter(actualData);
    
        sessionStorage.setItem(`id_${id}`, JSON.stringify(actualData));
    
        
        setError(null);
      } catch(err) {
        setError(err.message);
        setCharacter(null);
      } finally {
        setLoading(false);
      }  
    }else{
      let sessionCharacter = JSON.parse(data)
      setLoading(true)
      setCharacter(sessionCharacter);
      setLoading(false)
    }

  
}

useEffect(() => {
  getCharacterDetails()
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
}, [])

if(loading) return <Loading />

  return (
    <>
      <BackToList />
      <div className="cardDetails" key={character.url}>
          <img src= {`${imgURL + id}.jpg`} alt="character"/>
          <div className ="cardInfoDetails">
              {character.name != "unknown" && <h1 id="" ><b> {character.name}</b></h1>}
              {character.height != "unknown" &&<h2><b>Height: {character.height}</b></h2>}
              {character.mass != "unknown" && <h2><b>Mass: {character.mass}</b></h2>}
              {character.birth_year != "unknown" && <h2><b>Birth Year: {character.birth_year}</b></h2>}
          </div>
      </div>
    </>
  )
  
}


export default CharacterDetail