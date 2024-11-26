import { useState } from "react";
import { Link } from 'react-router-dom'; 

import "./HomePage.css";  

function HomePage() {
    
    const [tab, setTab] = useState('map-created-position'); 

    return (
        <div className="homepage-container">
            <div className="title">
                <h1>Home</h1>
            </div>

            <div className="homepage-3button">
                <div className="map-2button-container">
                    <i class="bi bi-clock-history"></i>
                    <button className="map-2button">
                      Homecar-อู่รถมั่นคง
                    </button>
                </div>
                <div className="map-2button-container">
                    <i class="bi bi-clock-history"></i>
                    <button className="map-2button">
                      Homecar-ร้านจันทร์ฉาย
                    </button>
                </div>
                <div>
                    <button className="map-1button">
                        <i class="bi bi-plus-circle"></i>
                    </button>
                </div>
            </div>

            <div className="go-search">
                <Link to='/search'>
                    <button 
                        className={'btn ' + (tab === 'search' ?  'btn-success' :
                        'btn-outline-success')}
                        onClick={() => setTab('search')}
                        >
                        ไปหน้าค้นหาสไลด์มี
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default HomePage;
