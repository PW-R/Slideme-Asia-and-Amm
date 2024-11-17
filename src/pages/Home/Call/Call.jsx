import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button, Offcanvas } from "react-bootstrap";

import { useJsApiLoader } from "@react-google-maps/api";


import './Call.css';

import Map from "../Map/Map";
// import Mapgg from "../Mapgg/Mapgg";
import { map } from "leaflet";


function Call() {
    const [tab, setTab] = useState('details');
    const [show, setShow] = useState(true);

    const navigate = useNavigate();

    const handleShow = () => {
        setShow(true);
        setTab('details');
    };

    const handleClose = () => setShow(false);

    const handleTabChange = (newTab) => {
        setTab(newTab);
        navigate(`/home/call/offcanvas/${newTab}`);
    };


    // const mapOptions = {
    //     googleMapsApiKey: GOOGLE_MAPS_API_KEY, 
    // };

    // const { isLoaded } = useJsApiLoader({
    //     id: mapOptions.googleMapsApiKey,
    //     googleMapsApiKey: mapOptions.googleMapsApiKey,
    //   });

    return (
        <div className="home-container">
            <div className="title">
                <Link 
                    to='/search'
                    onClick={() => setTab('search')}
                    >
                    <i className="bi bi-caret-left-fill" ></i>
                </Link>
                <h1>เรียกรถสไลด์</h1>
            </div>

            <div className="home-map">
                <Map />
                {/* <Mapgg isLoaded={isLoaded} /> */}
            </div>

            <div className="home-button">
                <Button 
                    variant="primary" 
                    onClick={handleShow} 
                    className="me-2">
                    เรียกรถสไลด์
                </Button>

                <div className="offcanvas-container">
                    <Offcanvas 
                        show={show} 
                        onHide={handleClose} 
                        placement="bottom"
                        className="offcanvas"
                    >
                        <Offcanvas.Body className="nav nav-underline">
                            <div className="button-container">
        
                                <button
                                    className={`nav-link ${tab === 'details' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('details')}
                                >
                                    รายละเอียด
                                </button>

                                <button
                                    className={`nav-link ${tab === 'offer' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('offer')}
                                >
                                    Offer
                                </button>
                            </div>
                        </Offcanvas.Body>

                        <div className="outlett-container">
                            <Outlet />
                        </div>
                        
                    </Offcanvas>
                </div>
            </div>
        </div>
    );
}

export default Call;
