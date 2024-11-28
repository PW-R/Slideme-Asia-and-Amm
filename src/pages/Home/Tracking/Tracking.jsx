import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';

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

  const location = useLocation();
  const [selectedOffer, setSelectedOffer] = useState(() => {
    const storedOffer = sessionStorage.getItem('selectedOffer');
    return location.state?.selectedOffer || (storedOffer ? JSON.parse(storedOffer) : null);
    });
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.selectedOffer) {
        setSelectedOffer(location.state.selectedOffer);
    }
}, [location.state]);

if (!selectedOffer) {
    return <p>ไม่มีข้อมูลการเรียกรถสไลด์</p>;
}

  const mapContainerRef = useRef(null); 

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
        {/* ลิ้งกลับไปหน้าใบเสร็จ */}
        <Link to='/summon' onClick={() => setTab('summon')}>
          <i class="bi bi-chevron-left"></i>
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
            <h3>{selectedOffer?.slideCarType || "ไม่มีประเภทของรถสไลด์"}</h3>
            <p>
              <i className="bi bi-clock-fill"></i>
              {routeInfo.time ? `${routeInfo.time} นาที` : "กำลังคำนวณ..."}
            </p>
            <p>
              <i className="bi bi-sign-turn-right-fill"></i>
              {routeInfo.distance ? `${routeInfo.distance} km` : "กำลังคำนวณ..."}
            </p>
          </div>

          <div className="tracking-car">
            <div className="car-image">
              <img src="cardark.png" alt="รถ" />
            </div>
            <div className="car-info">
              <p>{selectedOffer?.licensePlate || "ไม่มีข้อมูลคนขับ"}</p>
            </div>
          </div>
        </div>
        
        {/* line */}
        <hr className="line-tracking" />
          
        {/* tracking-driver */}
        <div className="tracking-driver">
          <div className="driver-profile">
            <img src="driver.png" alt="โปรไฟล์คนขับ" />
          </div>
          <div className="driver-info">
            <p>{selectedOffer?.name || "ไม่มีข้อมูลคนขับ"}</p>
            <p>
              <i className="bi bi-star-fill"></i>
              {selectedOffer?.reviewScore || "ไม่มีคะแนน"}
            </p>
          </div>
          <div className="driver-2button">
            <button
              className="btn btn-outline-success">
              <i className="bi bi-telephone" 
                onClick={() => window.location.href = `tel:${selectedOffer?.phoneNumber || '+0682538888'}`}>
              </i>
            </button>
          </div>

          {/* ลิ้งหน้าแชท */}
          <div className="driver-2button">
            <Link to='/chat'>
              <button 
                className="btn btn-outline-success">
                <i className="bi bi-chat"></i>
              </button>
            </Link>
          </div>
          
        </div>
        
        {/* ปุ่มกลับ */}
        <div className="tracking-button">
        <Link
          to="/menu/progress"
          state={{ selectedOffer: selectedOffer }}>
            <button 
              className="btn btn-success"
              onClick={() => setTab('/progress')}>
              กลับ
            </button>
        </Link>

        </div>
      </div>
    </div>
  );
}

export default Tracking;
