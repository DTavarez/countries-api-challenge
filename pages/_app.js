import '../styles/globals.css'
import AppContext from "../appContext";
import React, { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
    )
}

export default MyApp
