import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect} from 'react';
import Navbar from '../components/navbar'
import FilterSearch from '../components/filterSearch'
import FilterRegion from '../components/filterRegion'
import ListItems from '../components/listItems'
import axios from 'axios';

const regions = require("../assets/regions.json");

//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

export default function Home() {

  //handle countriesdata
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  //search country
  const [searchingCountry, setSearchingCountry] = useState(false);
  const [searchName, setSearchName] = useState("");
  //region filter
  const [filteringRegion, setFilteringRegion] = useState(false);
  const [regionFilter, setRegionFilter] = useState("");

  const [loadingResults, setLoadingResults] = useState(true); // if its searching we enable this
  const [perPage, setPerPage] = useState(32);

  // async function getRegionCountries(country){
  //   const res = await axios.get("https://restcountries.com/v2/region/" + country.region);
  //   setCountries(res.data);
  //   setRegionCountries(res.data);
  // } 

  async function getCountries(){
    const res = await axios.get("https://restcountries.com/v2/all");
    setCountries(res.data);
    setFilteredCountries(res.data);
  } 

  function handleSearchChange(s) {
    setLoadingResults(true);

    if (s === "") {
      setSearchName("");
      setSearchingCountry(false)
    }else{   
      setSearchingCountry(true);
      setSearchName(s);
    }
  }

  function handleRegionFilter(region) {

    setLoadingResults(true);

    if(region === "" || region === "All"){
      
      setFilteringRegion(false);
      setRegionFilter("");

    }else{

      setFilteringRegion(true);
      setRegionFilter(region);


    }

}
  useEffect(() => {

    getCountries()

  }, []);


   useEffect(() => {

    if(searchingCountry || filteringRegion){
      
      let newCountries = [];
      if(searchingCountry){
        newCountries = countries.filter((country) => {
          return country.name.toLowerCase().includes(searchName.toLowerCase());
        });
      }

      if(filteringRegion){

        if(searchingCountry){
          newCountries = newCountries.filter((country) => {
            return country.region.toLowerCase().includes(regionFilter.toLowerCase());
          });
        }else{
          newCountries = countries.filter((country) => {
            return country.region.toLowerCase().includes(regionFilter.toLowerCase());
          });
        }
      }

      setFilteredCountries(newCountries);
    
    }else{
      setFilteredCountries(countries);
    }

    setLoadingResults(false);

  }, [searchName, regionFilter]);

  function loadMore() {
    setPerPage(perPage + 10);
  }
 
  useEffect(() => {

    filteredCountries.slice(0, perPage);

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
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap-grid.min.css" />      
      </Head>
      <main>
        <Navbar/>
        <div className="body-container section-padding-vertical" >
          <div className="filters">
            <div className="col-12 col-sm-4 no-padding-horizontal">
              <FilterSearch handleSearchChange={handleSearchChange}/>
            </div>
            <div className="col-6 col-sm-2 no-padding-horizontal">
              <FilterRegion options={regions} handleRegionFilter={handleRegionFilter}/>
            </div>
          </div>
          {filteredCountries.length === 0 && (searchingCountry || filteringRegion) && 
            <div className="center-screen">
              No country found
            </div>
          }
          {filteredCountries.length > 0 && 
            <ListItems countries={filteredCountries.slice(0, perPage)} searching={loadingResults}/>
          }
        </div>
      </main>
    </div>
  )
}
