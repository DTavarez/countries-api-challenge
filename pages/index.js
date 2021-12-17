import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar'
import ListItems from '../components/listItems'
import axios from 'axios';


//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

export default function Home() {

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [focusCountry, setFocusCountry] = useState();
  const [perPage, setPerPage] = useState(32);

  function updateCountry(country){
    setFocusCountry(country);
  }

  async function getCountries(){
    setLoadingCountries(true);
    const res = await axios.get(`https://restcountries.com/v2/all`);
    setCountries(res.data);
    setLoadingCountries(false);
  } 

  useEffect(() => {
    getCountries()
  }, []);

  function loadMore() {
    setPerPage(perPage + 10);
  }

  useEffect(() => {
    countries.slice(0, perPage);
  }, [perPage]);

  function handleScroll() {
    console.log("hey")
    if (
        window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight
    ) {
        return;
    }

    loadMore();
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Country Api Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar/>
        <ListItems countries={countries.slice(0, perPage)} setFocusCountry={setFocusCountry}/>
      </main>
    </div>
  )
}
