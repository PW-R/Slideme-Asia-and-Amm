import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { usePosition } from "../../../../data/PositionContext";   

import "./Map_Created_Position.css";

function Map_Created_Position() {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state || {};
  const { setCallback, currentPosition } = usePosition();
  const [position, setPosition] = useState(currentPosition || [13.736717, 100.523186]); 

  const customIcon = L.divIcon({
    className: "leaflet-div-icon",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
      </svg>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // ฟังก์ชันจัดการคลิกบนแผนที่
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const handleSavePosition = () => {
    navigate(-1);
  };

  return (
    <div className="mappages-container">
      <div className="title-map">
        <Link to="/created_position">
          <i className="bi bi-caret-left-fill"></i>
        </Link>
        <h1>ตำแหน่งที่สร้างไว้</h1>
      </div>
      <div className="map-page">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "80vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapClickHandler />
          {position && (
            <Marker position={position} icon={customIcon}>
              <Popup>ตำแหน่งที่เลือก</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <div className="map-details">
        <div className="confirm">
          <button className="btn btn-success" onClick={handleSavePosition}>
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}

export default Map_Created_Position;


