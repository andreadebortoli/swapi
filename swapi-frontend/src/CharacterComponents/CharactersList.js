
import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import './CharactersList.css';
import Loading from '../NavigationComponents/Loading';
import Pagination from '../NavigationComponents/Pagination'
import { AppContext } from '../Contexts/AppContext';
import BackToHome from '../NavigationComponents/BackToHome';

const imgURL = 'https://starwars-visualguide.com/assets/img/characters/'

function getId(url) {
  return url.split('/')[url.split('/').length - 2]
}

export default function CharactersList (props){

  const [characters, setCharacters] = useState([]);
  const {setCurrentPageUrl} = useContext(AppContext)
  const {currentPageUrl} = useContext(AppContext)
  const {setcurrentPageNumber} = useContext(AppContext)
  const {currentPageNumber} = useContext(AppContext)
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

  if(loading) return <Loading />

    return (
      <>
      <BackToHome />
      
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        currentPageNumber={currentPageNumber}
        total={total}
      />
        <div className="charactersList">
          {characters.map(c => (
            <div className="card" key={c.url}>
                      <Link className="details" to={`/Character/${getId(c.url)}`}  >
                      <div className="inner">
                        <img src= {`${imgURL + getId(c.url)}.jpg`} alt="character"/>
                        <div className ="cardInfo">
                            <h4><b>{c.name}</b></h4>
                        </div>
                      </ div>
                    </ Link>
                    </div>
          ))}
        </div>
      
      </>
    )
  
}
