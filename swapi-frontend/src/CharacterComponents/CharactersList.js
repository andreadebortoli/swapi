import React from 'react'
import {Link} from "react-router-dom";
import './CharactersList.css';

const imgURL = 'https://starwars-visualguide.com/assets/img/characters/'

function getId(url) {
  return url.split('/')[url.split('/').length - 2]
}

export default function CharactersList ({characters}){
    return (
      <>
      {/* <h5>{total}</h5> */}
      
        <div className="charactersList">
          {characters.map(c => (
              <div className="card" key={c.url}>
                  <img src= {`${imgURL + getId(c.url)}.jpg`} alt="character"/>
                  <div className ="cardInfo">
                    <Link className="details" to={`/CharacterDetails/${getId(c.url)}`}>
                      <h4><b>{c.name}</b></h4>
                    </ Link>
                  </div>
              </div>
          ))}
        </div>
      
      </>
    )
  
}
