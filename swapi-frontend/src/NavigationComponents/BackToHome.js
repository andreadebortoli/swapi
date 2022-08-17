import React, {useContext} from 'react'
import {Link, useParams} from "react-router-dom";
import { AppContext } from '../Contexts/AppContext';
import '../NavigationComponents/Back.css'


import './Loading.css'

export default function BackToHome () {

    const {setCurrentPageUrl} = useContext(AppContext)

    
    return (
        <Link to={'/'} onClick={() => {
          setCurrentPageUrl = "https://swapi.dev/api/people/"
      }} > &lt;-- BACK TO HOME </ Link>
    )
  
}
