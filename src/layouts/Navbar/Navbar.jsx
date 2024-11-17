import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

import './navbar.css'


function Navbar() {
    const [tab, setTab] = useState();

    return ( 
        <div className="navbar-container">

            <Link to='/search'>
                <button 
                    className={'btn ' + (tab === 'search' ?  'btn-primary' :
                    'btn-outline-primary')}
                    onClick={() => setTab('search')}>Home
                </button>
            </Link>

            <Link to='/menu'>
                <button 
                    className={'btn ' + (tab === 'menu' ?  'btn-primary' :
                    'btn-outline-primary')}
                    onClick={() => setTab('menu')}>Menu
                </button>
            </Link>

            <Link to='/home/call'>
                <button 
                    className={'btn ' + (tab === 'call' ?  'btn-primary' :
                    'btn-outline-primary')}
                    onClick={() => setTab('call')}>Home
                </button>
            </Link>

            <Link to='/menu'>
                <button 
                    className={'btn ' + (tab === 'menu' ?  'btn-primary' :
                    'btn-outline-primary')}
                    onClick={() => setTab('menu')}>Menu
                </button>
            </Link>
            
        </div>
     );
}


export default Navbar;