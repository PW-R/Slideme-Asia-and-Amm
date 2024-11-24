import { useState, useEffect, useRef } from "react";
import { Link,Outlet} from 'react-router-dom';
import { Button, Carousel } from "react-bootstrap";  

import { useNavigate } from "react-router-dom";
import { usePosition } from "../../../data/PositionContext";

import "./HomePage.css";  

function HomePage() {
    
    const [tab, setTab] = useState('map-created-position'); 

    return (
        <div className="search-container">
            <div className="title">
                <h1>สวัสดี เจน</h1>
            </div>

            <div className="created-button">
                <Link to='/map_homepage'>
                    <button 
                        className={'btn ' + (tab === 'map_homepage' ?  'btn-success' :
                        'btn-outline-success')}
                        onClick={() => setTab('map_homepage')}
                        >
                        ตำแหน่งที่สร้างไว้
                    </button>
                </Link>
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
