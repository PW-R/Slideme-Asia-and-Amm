import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { usePosition } from "../../../../data/PositionContext";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./MapPage.css";

function MapPage() {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchType = location.state?.type || "origin"; 
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { setOrigin, setDestination } = usePosition();
  const [title, setTitle] = useState("");

  const customIcon = L.divIcon({
    className: "leaflet-div-icon",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
        stroke="gray" stroke-width="0.5" />
      </svg>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  // ดึงข้อมูลที่อยู่จาก Lat/Lng
  useEffect(() => {
    if (position) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}&accept-language=th,en`
      )
        .then((response) => response.json())
        .then((data) => {
          const displayName = data.display_name;
          const isThai = /[\u0E00-\u0E7F]/.test(displayName); 
          setAddress(isThai ? displayName : `${displayName} (EN)`); 
        })
        .catch((error) => console.error("Error fetching address:", error));
    }
  }, [position]);
  
  useEffect(() => {
    if (searchType === "origin") {
      setTitle("ตำแหน่งต้นทาง");
    } else if (searchType === "destination") {
      setTitle("ตำแหน่งปลายทาง");
    }
  }, [searchType]);

  // ค้นหาตำแหน่งจากชื่อสถานที่
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&addressdetails=1&limit=5&countrycodes=TH&accept-language=th,en`
        );
        const data = await response.json();
  
        // จัดลำดับให้ภาษาไทยก่อนภาษาอังกฤษ
        const processedResults = data.map((result) => {
          const displayName = result.display_name;
          const isThai = /[\u0E00-\u0E7F]/.test(displayName); // ตรวจสอบว่ามีภาษาไทยหรือไม่
          return {
            ...result,
            display_name: isThai ? displayName : `${displayName} (EN)`, // ภาษาไทยเป็นหลัก หากไม่มีเพิ่ม "(EN)"
          };
        });
  
        setSearchResults(processedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };
  
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const handleConfirm = () => {
    if (!position) {
      alert("กรุณาเลือกตำแหน่งก่อนยืนยัน");
      return;
    }

    if (searchType === "origin") {
      setOrigin(position);
    } else if (searchType === "destination") {
      setDestination(position);
    }
    navigate("/search");
  };

  const handleSelectResult = (lat, lon) => {
    setPosition([lat, lon]);
    setSearchResults([]);
  };
  
  return (
    <div className="mappages-container">
      <div className="title-map">
        <Link to="/search">
          <i class="bi bi-chevron-left"></i>
        </Link>
        <h1>{title}</h1>
      </div>
      <div className="search-map-container">
        <div className="icon">
          <i class="bi bi-search"></i>        
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="ค้นหาตำแหน่ง"/>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result) => (
              <div
                key={result.place_id}
                className="search-result-item"
                onClick={() => handleSelectResult(result.lat, result.lon)}>
                <p>{result.display_name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="map-page">
        <MapContainer
          center={[13.736717, 100.523186]} // Bangkok default
          zoom={13}
          style={{ height: "80vh", width: "100%" }}
          whenCreated={(map) => (mapRef.current = map)}
          zoomControl={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"/>
          <MapClickHandler />
          {position && (
            <Marker position={position} icon={customIcon}>
              <Popup>{address || "ตำแหน่งที่เลือก"}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="map-details">
        <div className="selected-location">
          <h2>ตำแหน่งที่เลือก</h2>
          <p>{address || "..."}</p>
        </div>
        <div className="confirm">
          <button 
            className="btn btn-success" 
            onClick={handleConfirm}>
            ยืนยันตำแหน่ง
          </button>
        </div>

      </div>
    </div>
  );
}
export default MapPage;