import React, { useState, useEffect } from 'react';

function Filter({handleSearchChange}){
    const [countries, setCountries] = useState([]);
    const [filterSearch, setFilterSearch] = useState("");

    useEffect(() => {
        handleSearchChange(filterSearch);
    }, [filterSearch])

    return (
        <div className="wrld-filter elements shadow">
            <div>
                <i className='fa fa-search fa-lg center-vertically'></i>
            </div>
            <input 
                type="text"
                className="filter-input elements"
                placeholder="Search for a country..."
                onChange={(e) => setFilterSearch(e.target.value)}
            />
        </div>
    )
}

export default Filter;