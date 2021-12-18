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
  const [perPage, setPerPage] = useState(32);

  function updateFocusCountry(country){
    setFocusCountry(country);
    getRegionCountries(country);
  }

  async function getRegionCountries(country){
    const res = await axios.get("https://restcountries.com/v2/region/" + country.region);
    setCountries(res.data);
    setRegionCountries(res.data);
  } 

  async function getCountries(){
    const res = await axios.get("https://restcountries.com/v2/all");
    setCountries(res.data);
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

    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight){
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
        <div className="body-container section-padding-vertical" >
          <ListItems countries={countries.slice(0, perPage)}/>
        </div>
      </main>
    </div>
  )
}
