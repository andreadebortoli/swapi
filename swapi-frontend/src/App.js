import './App.css';
import CharactersList from './CharacterComponents/CharactersList'
import CharacterDetails from './CharacterComponents/CharacterDetails'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { AppContextProvider } from './Contexts/AppContext';


function App() {

  
  return (
    <AppContextProvider >
      <div className="App">
        <Router>
        <header className="App-header">
          <h1> Star Wars Characters </h1>
        </header>
          <Routes >
            <Route path="/" element={<CharactersList  />}></Route> 
            <Route path="/Character/:id" element={<CharacterDetails  />}></Route> 
          </Routes>
        </Router>
      </div>
    </ AppContextProvider>
  );
}

export default App;
