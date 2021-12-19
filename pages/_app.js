import '../styles/globals.css'
import React from 'react';
import {AppThemeProvider} from "../contexts/themeContext"

function MyApp({ Component, pageProps }) {
  return (
      <AppThemeProvider>
          <Component {...pageProps} />
      </AppThemeProvider>
    )
}

export default MyApp
