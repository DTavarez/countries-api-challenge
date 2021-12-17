import React from 'react';

function NavBar(){
    return (
        <div>
            <nav className="navbar elements shadow" >
                <div className="container">
                    <a className="header1">Where in the world?</a>
                    <div>
                        <i className='fa fa-moon-o'></i>
                        <span className="header2">Dark Mode</span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;