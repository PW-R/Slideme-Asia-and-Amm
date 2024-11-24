import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

import './navbar.css'


function Navbar() {
    const [tab, setTab] = useState();

    return ( 
        <div className="navbar-container">

            <Link to='/homepage'>
                <button 
                    className={'btn ' + (tab === 'homepage' ?  'btn-primary' :
                    'btn-outline-primary')}
                    onClick={() => setTab('homepage')}>Home
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
                    onClick={() => setTab('call')}>Noti
                </button>
            </Link>

            <Link to='/created_position'>
                <button 
                    className={'btn ' + (tab === 'created_position' ?  'btn-primary' :
                    'btn-outline-primary')}
                    onClick={() => setTab('created_position')}>user
                </button>
            </Link>
            
        </div>
     );
}


export default Navbar;