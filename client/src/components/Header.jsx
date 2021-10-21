import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css'

const Header = props => {
    //username passed in a prop
    const { userName } = props;

    //dynamically returns header if a user is logged in or logged out
    return ( 
        <header className="loggedOut">
            <div className="wrap header--flex">
                <NavLink id="courseButton" to="/">Courses</NavLink>
                {userName ? 
                    <nav>
                        <ul className="header--signedin">
                            <li>Welcome, {userName}!</li>
                            <li><NavLink className="navLink" to="/signout">Sign Out</NavLink></li>
                        </ul>
                    </nav>
                :
                    <nav className="header--signedout">
                        <ul >
                            <li><NavLink className="navLink" to="/signup">Sign Up</NavLink></li>
                            <li><NavLink className="navLink" to="/signin">Sign In</NavLink></li>
                        </ul>
                    </nav>
                }
            </div>
        </header>
    );
}
 
export default Header;
