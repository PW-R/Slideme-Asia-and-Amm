import { useState } from "react";
import { Link } from 'react-router-dom';
import "./HomePage.css";  // Make sure to adjust styles if needed.

function HomePage() {
    const [tab, setTab] = useState('map-created-position'); 

    return (
        <div className="homepage-container">
            <div className="title">
                <h1>Home Hub</h1>
            </div>

            {/* Button Section */}
            <div className="homepage-3button">
                <div className="map-2button-container">
                    <i className="bi bi-clock-history"></i>
                    <button className="map-2button">
                      Homecar-อู่รถมั่นคง
                    </button>
                </div>
                <div className="map-2button-container">
                    <i className="bi bi-clock-history"></i>
                    <button className="map-2button">
                      Homecar-ร้านจันทร์ฉาย
                    </button>
                </div>
                <div>
                    <button className="map-1button">
                        <i className="bi bi-plus-circle"></i>
                    </button>
                </div>
            </div>

            {/* Search Link */}
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
