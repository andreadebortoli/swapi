import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import './CharacterDetails.css';

const url = "https://swapi.dev/api/people/";
const imgURL = 'https://starwars-visualguide.com/assets/img/characters/'

function getId(urlD) {
  return urlD.split('/')[url.split('/').length - 2]
}

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
        console.log("from api")
        const response = await fetch(urlDetails);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        console.log(actualData)
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
      console.log("from session")
      let sessionCharacter = JSON.parse(data)
      setLoading(true)
      setCharacter(sessionCharacter);
      setLoading(false)
    }

  
}

useEffect(() => {
  getCharacterDetails()

}, [])

if(loading) return "Loading..."

  return (

      <div className="cardDetails" key={character.url}>
          <img src= {`${imgURL + id}.jpg`} alt="character"/>
          <div className ="cardInfoDetails">
              <h1 id="" ><b> {character.name}</b></h1>
              <h2><b>Height: {character.height}</b></h2>
              <h2><b>Mass: {character.mass}</b></h2>
              <h2><b>Birth Year: {character.birth_year}</b></h2>


          </div>
      </div>

  )
  
}


export default CharacterDetail