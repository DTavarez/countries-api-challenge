import React, { useState, useEffect } from 'react';
import Country from '../components/country'
import InfiniteScroll from 'react-infinite-scroller';

function listItems({countries}){
    const [perPage, setPerPage] = useState(32);

    return (
        <div className="listItems countries elements-padding">
            <div className="container">
                {countries.map((country, key) => (
                    <Country country={country} key={key}/>
                ))} 
            </div>
        </div>
    )
}

export default listItems;