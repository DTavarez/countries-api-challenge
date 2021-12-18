// src/context/state.js
import React, { useState, useContext, createContext } from 'react';
import { ThemeProvider, createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
body{
  background-color: ${props => props.theme.mode === "light" ? "hsl(0, 0%, 98%)" : "hsl(200, 15%, 8%)"};
  color: ${props => props.theme.mode === "light" ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)"};
}
.elements{
  background-color: ${props => props.theme.mode === "light" ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)"};
  color: ${props => props.theme.mode === "light" ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)"};
}
`
const AppContext = createContext();
const UpdateThemeContext = createContext();

export function useAppThemeContext() {
    return useContext(AppContext);
}

export function useUpdateThemeContext() {
    return useContext(UpdateThemeContext);
}

export function AppThemeProvider({ children }) {

    const [theme, setTheme] = useState({mode:"dark"});

    function toogleTheme(){     
        if(theme.mode == "light") setTheme({mode: "dark"})
        if(theme.mode == "dark") setTheme({mode: "light"})
    }

  return (
    <AppContext.Provider value={theme}>
        <UpdateThemeContext.Provider value={toogleTheme}>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                {children}
            </ThemeProvider>
        </UpdateThemeContext.Provider>
    </AppContext.Provider>
  );
}

