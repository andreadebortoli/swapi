import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import './CharactersList.css';

const url = "https://swapi.dev/api/people/";
const imgURL = 'https://starwars-visualguide.com/assets/img/characters/'

function getId(urlD) {
  return urlD.split('/')[url.split('/').length - 2]
}

function CharacterDetail (){
  
  // console.log(props)

  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const urlDetails = url + id; 

const getCharacterDetails = async () => {


// console.log(id)

  try {
    const response = await fetch(urlDetails);
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    let actualData = await response.json();
    console.log(actualData)
    setCharacter(actualData);
    setError(null);
  } catch(err) {
    setError(err.message);
    setCharacter(null);
  } finally {
    setLoading(false);
  }  
}

useEffect(() => {
  getCharacterDetails()
}, [])


    // let { id } = useParams();
  return (
    <div className="characteDetails">
              <div className="card" key={character.url}>
                  {/* <img src= {`${imgURL + getId(character.url)}.jpg`} alt="character"/> */}
                  <div className ="cardInfo">
                      <h4><b>{character.name}</b></h4>
                  </div>
              </div>
        </div>
  )
  
}


export default CharacterDetail