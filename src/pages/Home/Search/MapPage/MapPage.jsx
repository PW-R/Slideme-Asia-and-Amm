import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import './MapPage.css';

function MapPage() {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchType = location.state?.type || 'origin';  // รับข้อมูลว่าเป็นต้นทางหรือปลายทาง

  // ดึงข้อมูลที่อยู่จาก Lat/Lng
  useEffect(() => {
    if (position) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAddress(data.display_name);
        })
        .catch((error) => console.error('Error fetching address:', error));
    }
  }, [position]);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  // เก็บตำแหน่งใน localStorage และย้ายไปหน้า Search
  const handleConfirm = () => {
    // เก็บตำแหน่งที่เลือกใน localStorage
    const storedPositions = JSON.parse(localStorage.getItem('positions')) || {};
    storedPositions[searchType] = position;
    localStorage.setItem('positions', JSON.stringify(storedPositions));

    // ไปที่หน้า Search
    navigate('/search');
  };

  return (
    <div className="map-page">
      <div className="title">
        <Link to="/search">
          <i className="bi bi-caret-left-fill"></i>
        </Link>
        <h1>ตำแหน่ง</h1>
      </div>

      <div className="map-container">
        <MapContainer
          center={[13.736717, 100.523186]} // Bangkok default
          zoom={13}
          style={{ height: '60vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapClickHandler />
          {position && <Marker position={position} />}
        </MapContainer>
      </div>

      <div className="map-details">
        <div className="details">
          <p>
            ตำแหน่งที่เลือก: {position ? `${position[0]}, ${position[1]}` : 'ยังไม่ได้เลือก'}
          </p>
          <p>ที่อยู่: {address || 'กำลังโหลด...'}</p>
        </div>
        <div className="map-confirm">
          <button onClick={handleConfirm}>ยืนยันตำแหน่ง</button>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
