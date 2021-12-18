import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect,useContext } from 'react';
import Navbar from '../components/navbar'
import axios from 'axios';
import { useRouter } from 'next/router'
import Router from 'next/router'

//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

function Country() {
 
  const [country, setFocusCountry ] = useState();;
  const [loading, setLoading ] = useState(false);
  const [searchError, setSearchError ] = useState(false);

  const router = useRouter()

  async function getCountry(name){
    const url = "https://restcountries.com/v2/name/" + String(name).replace(" ", "%20");
    const res = await axios.get(url);

    if(res.status === 200){
      setFocusCountry(res.data[0]);
      setSearchError(false);
    }else{
      setSearchError(true);
    }
  } 

  useEffect(() => { 

    setLoading(false);

  }, [country]);

  useEffect(() => {

    const {name} = router.query;

    if(name){
      setLoading(true);
      getCountry(name);
    }else{
      setSearchError(true);
    }

  }, [router.query]);
  
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
        <div className="body-container section-padding-vertical">
          <a className="wrld-btn shadow elements" onClick={()=>Router.push({pathname: "/",})}>
            <i class="fa fa-long-arrow-left" style={{paddingTop: "3px"}}></i>
            <span>Back</span>
          </a>
          <div className="section-padding-vertical">
            {/*loading && 
              <div className="center-screen">
                Loading...
              </div>
            */}   
            {searchError && !loading && <div className="center-screen">
              Country not found, go back
            </div>}

            {!loading && country &&
              <div className="card-expanded row no-padding-horizontal">
                <div className="card-expanded-image col-12 col-sm-5 no-padding-horizontal">
                  <img className="wrld-image flag" src={country.flag} ></img>
                </div>
                <div className="card-expanded-body col-12	col-sm-6 no-padding-horizontal">  
                <div className="card-expanded-title">
                    <span>{country.name}</span> 
                </div>
                <div className="card-expanded-resume row no-padding-horizontal">
                  <ul className="element-padding-vertical col-12 col-sm-6 no-padding-horizontal">
                    <li>
                      <span className="detail-key">Native Name: </span>
                      <span className="detail-value"> {country.nativeName}</span>
                    </li>
                    <li>
                      <span className="detail-key">Population: </span>
                      <span className="detail-value">{country.population}</span>
                    </li>
                    <li>
                      <span className="detail-key">Region: </span>
                      <span className="detail-value">{country.region}</span>
                    </li>
                    <li>
                      <span className="detail-key">Sub Region: </span>
                      <span className="detail-value">{country.subregion}</span>
                    </li>
                    <li>
                      <span className="detail-key">Capital: </span>
                      <span className="detail-value">{country.capital}</span>
                    </li>
                  </ul>
                  <ul className="element-padding-vertical col-12 col-sm-6 no-padding-horizontal">
                    <li>
                      <span className="detail-key">Top Level Domain: </span>
                      <span className="detail-value">{country.topLevelDomain.map((domain, key) => {return <spa>{domain}  </spa>})}</span>
                    </li>
                    <li>
                      <span className="detail-key">Currencies: </span>
                      <span className="detail-value">{country.currencies.map((currency, key) => {return <spa>{currency.name}  </spa>})}</span>
                    </li>
                    <li>
                      <span className="detail-key">Language: </span>
                      <span className="detail-value">{country.languages.map((language, key) => {return <spa>{language.name}  </spa>})}</span>
                    </li>
                  </ul>
                </div> 
              </div>
             </div>
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default Country;
