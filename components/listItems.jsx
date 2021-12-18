import React, { useState, useEffect } from 'react';
import Country from './cardCountry'

function listItems({countries}){

    return (
        <div className="listItems section-padding-vertical">
                {countries.map((country, key) => (
                    <Country onClick={()=>console.log("ups")} country={country}/>
                ))} 
        </div>
    )
}

export default listItems;