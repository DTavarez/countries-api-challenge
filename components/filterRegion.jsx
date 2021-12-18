import React, { useState, useEffect } from 'react';

function Filter({options, handleRegionFilter}){
    const [countries, setCountries] = useState([]);
    const [region, setRegion] = useState("");

    useEffect(() => {
        handleRegionFilter(region);
    }, [region])

    return (
        <div className="wrld-filter-region">
            <select 
                className="filter-region shadow"
                value={region} 
                onChange={(e)=>setRegion(e.target.value)}
            >
                <option value="All">Filter by Region</option>
                {options && options.map((option)=>{
                    return <option value={option}>{option}</option>
                })}
            </select>
        </div>
    )
}

export default Filter;