import React, {createContext, useState} from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children}) => {
    const [currentPageUrl, setCurrentPageUrl] = useState("https://swapi.dev/api/people/")
    const [currentPageNumber, setcurrentPageNumber] = useState(1)
    const value = { 
        currentPageUrl, 
        setCurrentPageUrl,
        currentPageNumber, 
        setcurrentPageNumber
    }

    return (
        <AppContext.Provider value={value}> {children} </AppContext.Provider>
    );
}

export default AppContext;