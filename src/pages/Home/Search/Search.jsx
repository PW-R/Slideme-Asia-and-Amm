import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePosition } from "../../../data/PositionContext";

import "./Search.css";

function Search() {
  const { origin, setOrigin, destination, setDestination } = usePosition();
  const navigate = useNavigate();
  const [originAddress, setOriginAddress] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState(null);

  // ฟังก์ชันแปลงพิกัดเป็นที่อยู่
  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=th,en`
      );
      const data = await response.json();
      return data.display_name || "ไม่สามารถดึงข้อมูลที่อยู่ได้";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "ไม่สามารถดึงข้อมูลที่อยู่ได้";
    }
  };
  
  // อัปเดตที่อยู่เมื่อ origin หรือ destination เปลี่ยน
  useEffect(() => {
    if (origin) {
      fetchAddress(origin[0], origin[1]).then(setOriginAddress);
    }
  }, [origin]);
  
  useEffect(() => {
    if (destination) {
      fetchAddress(destination[0], destination[1]).then(setDestinationAddress);
    }
  }, [destination]);

  // ฟังก์ชันไปที่หน้า MapPage
  const handleNavigateToMap = (type) => {
    navigate("/map", { state: { type } });
  };

  return (
    <div className="search-container">
      
      <div className="title">

        {/* ลิ้งไปหน้า home */}
          {/* <Link 
              to='/search'
              onClick={() => setTab('search')}
              >
              <i className="bi bi-caret-left-fill" ></i>
          </Link> */}

        <i class="bi bi-chevron-left"></i>
        <h1>ค้นหาสถานที่</h1>
      </div>

      {/* เลือกตำแหน่ง */}
      <div className="location-container">
        <div className="location-icon">
          <div className="location-circle"></div>
          <i class="bi bi-geo-alt"></i>
        </div>

        <div className="location">
          <div>
            <button onClick={() => handleNavigateToMap("origin")} className="location-button">
              {originAddress ? `${originAddress}` : "เลือกตำแหน่งต้นทาง"}
            </button>
          </div>

          <div>
            <button onClick={() => handleNavigateToMap("destination")} className="location-button">
              {destinationAddress ? `${destinationAddress}` : "เลือกตำแหน่งปลายทาง"}
            </button>
          </div>
        </div>

      </div>

      {/* ปุ่มค้นหา */}
      <div className="search-button">
        <button
          onClick={() => {
            if (origin && destination) {
              navigate("/call");
            } else {
              alert("กรุณาเลือกตำแหน่งต้นทางและปลายทางก่อนค้นหา");
            }
          }}
          className={origin && destination ? 'btn btn-success' : 'btn btn-outline-success'}>
          ค้นหา Slide me
        </button>
      </div>
    </div>
  );
}

export default Search;
