import Header from '../Header/Header';
import Menu from '../../pages/Menu/Menu';
import Home from '../../pages/Home/Call/Call';
import Navbar from '../Navbar/Navbar';

import { Outlet } from 'react-router';

import './Layout.css'

function Layout( { tab, setTab } ) {
    return ( 
        <div>
            < Header />
            < Outlet />
            < Navbar />
        </div>
     );
}

export default Layout;