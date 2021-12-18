import React, { useState, useEffect } from 'react';
import Country from './cardCountry'

function listItems({countries}){
    //console.log(countries)
    return (
        <div className="listItems section-padding-vertical">
                {/*searching && <div className="center-screen">
                    Searching...
                </div>*/}
                {countries.length > 0 && countries.map((country, key) => (
                    <Country country={country}/>
                ))} 
        </div>
    )
}

export default listItems;