import { Outlet } from 'react-router';

import './Layout.css'

import Header from '../Header/Header';

import Menu from '../../pages/Menu/Menu';
import Home from '../../pages/Home/Call/Call';

import Navbar from '../Navbar/Navbar';

function Layout( { tab, setTab } ) {

    return ( 
        <div>
            < Header />

            {/* < Home  tab={tab} setTab={setTab} />
            < Menu  tab={tab} setTab={setTab} /> */}

            < Outlet />
            < Navbar />
        </div>
     );
}

export default Layout;