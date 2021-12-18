import React, { useState, useEffect } from 'react';
import Country from './cardCountry'

function listItems({countries}){
    return (
        <div className="listItems section-padding-vertical">
            {countries.length > 0 && countries.map((country, key) => (
                <Country country={country}/>
            ))} 
        </div>
    )
}

export default listItems;