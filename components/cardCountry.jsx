import React, { useState, useEffect, useContext } from 'react';
import Router from 'next/router'
import Link from 'next/link'

function cardCountry({country}){

    console.log(country)

    return (
            <div 
                className="card shadow elements" 
                key={country.name} 
                onClick={()=>Router.push({
                    pathname: "/country",
                    query: {name: country.name}
                })}
            >
                <div className="card-image">
                    <img className="flag" src={country.flag} ></img>
                </div>
                <div className="card-body">   
                    <div className="card-title">
                        <span>{country.name}</span> 
                    </div>
                    <div className="card-resume">
                        <ul>
                            <li><span className="detail-key">Population: </span><span> {country.population}</span></li>
                            <li><span className="detail-key">Region: </span> <span> {country.region}</span></li>
                            <li><span className="detail-key">Capital: </span> <span> {country.capital}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
       
    )
}

export default cardCountry;