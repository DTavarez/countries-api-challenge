import React, { useContext } from 'react';
import AppContext from "../pages/_app";
import {useAppThemeContext, useUpdateThemeContext} from "../contexts/themeContext"


function NavBar(){
    
    const theme = useAppThemeContext();  
    const toogleTheme = useUpdateThemeContext();
    
    return (
        <div>
            <nav className="wrld-navbar elements shadow body-container" >
                <div className="header1">Where in the world?</div>
                <a className="themeToogle" onClick={toogleTheme}>
                    {theme === "light" ?  
                        <i className='fa fa-moon-o'></i>
                        : <i className='fa fa-moon-o'></i>
                    }
                    <span className="header2">Dark Mode</span>
                </a>
            </nav>
        </div>
    )
}

export default NavBar;