import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

function Header(){
return(
    <header className="site-header">
        <h1><Link to="/" className="Header-logo">CompareTech</Link></h1>
        
        <nav>
            <ul>
                <li><Link to="/Laptops">Laptops</Link></li>
                <li><Link to="/telephones">Téléphones</Link></li>
                <li><Link to="/">CPus</Link></li>
                <li><Link to="/gpus">Gpus</Link></li>
        </ul>    
        </nav>
    </header>
);
}
export default Header;