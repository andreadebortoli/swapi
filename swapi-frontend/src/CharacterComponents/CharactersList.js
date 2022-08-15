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
      
      
        <div className="charactersList">
          {characters.map(c => (
                    <Link className="details" to={`/Character/${getId(c.url)}`} key={c.url}>
                    <div className="card" >
                        <img src= {`${imgURL + getId(c.url)}.jpg`} alt="character"/>
                        <div className ="cardInfo">
                            <h4><b>{c.name}</b></h4>
                        </div>
                    </div>
                    </ Link>
          ))}
        </div>
      
      </>
    )
  
}
