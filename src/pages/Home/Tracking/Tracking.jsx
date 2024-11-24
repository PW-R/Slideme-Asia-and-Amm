import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button, Offcanvas } from "react-bootstrap";
import { Outlet } from 'react-router';

import L from 'leaflet';
import Map_Tracking from "./Map_Tracking/Map_Tracking";
import { usePosition } from "../../../data/PositionContext";
import { useRouteInfo } from "../../../data/PositionContext";

import './Tracking.css';

function Tracking() {

    const [tab, setTab] = useState('details');
    const [show, setShow] = useState(true);
    const { origin, destination } = usePosition();
    const { routeInfo } = useRouteInfo(); 

    const navigate = useNavigate();

    console.log('Origin:', origin); 
    console.log('Destination:', destination); 
  
    const mapContainerRef = useRef(null); // Create a ref for the map container

    const handleShow = () => {
      setShow(true);
      setTab('details');
    };
  
    const handleClose = () => setShow(false);
  
    const handleTabChange = (newTab) => {
      setTab(newTab);
      navigate(`/home/call/offcanvas/${newTab}`);
    };
  
    useEffect(() => {
      if (origin && destination && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current).setView(origin, 13);
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);
  
        const routingControl = L.Routing.control({
          waypoints: [L.latLng(origin[0], origin[1]), L.latLng(destination[0], destination[1])],
          routeWhileDragging: true,
          lineOptions: { styles: [{ color: 'blue', weight: 6 }] },
        });
  
        routingControl.on('routesfound', () => {
          setIsRouteReady(true);
        });
  
        routingControl.addTo(map);
  
        return () => {
          map.remove();
        };
      }
    }, [origin, destination]);

    return ( 
      <div className="tracking-container">
        <div className="title-map">
            <Link to='/summon' onClick={() => setTab('summon')}>
                <i className="bi bi-caret-left-fill"></i>
            </Link>
            <h1>สถานะรถสไลด์</h1>
        </div>
        <div className="tracking-map">
            {origin && destination ? (
            <Map_Tracking origin={origin} destination={destination} />
            ) : (
            <p className="alert">กรุณาเลือกตำแหน่งต้นทางและปลายทางก่อน</p>
            )}
        </div>
            
        {/* tracking-tab */}
        <div className="tracking-tab">
          <div className="tracking-details">

            <div className="tracking-details-2">
              <h3>รถสไลด์ขนาดเล็ก</h3>
              <p>
                <i class="bi bi-clock-fill"></i>
                {routeInfo.time ? `${routeInfo.time} นาที` 
                : "กำลังคำนวณ..."}
              </p>
              <p>
                <i class="bi bi-sign-turn-right-fill"></i>
                {routeInfo.distance ? `${routeInfo.distance} km` 
                : "กำลังคำนวณ..."}
              </p>
            </div>

            <div className="tracking-car">
              <div className="car-image">
                <img src="cardark.png"/>
              </div>
              <div className="car-info">
                <p>กก-9877</p>
                <p>กรุงเทพมหานคร</p>
            </div>
          </div>
        </div>
        
        {/* line */}
        <hr className="line-tracking" />
          
        {/* tracking-driver */}
        <div className="tracking-driver">
          <div className="driver-profile">
            <img src="driver.png"/>
          </div>
          <div className="driver-info">
            <p>สมใจ สมดีนคร</p>
            <p>
              <i class="bi bi-star-fill"></i>
              4.9
            </p>
          </div>
          <div className="driver-call">
            <i class="bi bi-telephone" 
              onClick={() => window.location.href = 'tel:+0682538888'}>
            </i>
          </div>

          {/* ลิ้งหน้าแชท */}
          <div className="driver-chat">
            <Link to='/chat'>
                <button 
                    className={tab === 'information' ? 'btn btn-success' : 'btn btn-outline-success'}>
                    <i class="bi bi-chat"></i>
                </button>
            </Link>
          </div>
          
        {/* ปุ่มกลับ */}
        </div>
          <div className="tracking-button">
            <Link to='/menu/progress'>
                <Button
                    onClick={() => setTab('/progress')}>
                    กลับ
                </Button>
            </Link>
          </div>

      </div>
    </div>
  );
}

export default Tracking;