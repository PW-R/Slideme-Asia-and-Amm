import { useState, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";

import { usePosition } from "../../../../data/PositionContext";
import { useRouteInfo } from "../../../../data/PositionContext";

import './Details.css';

function Details() {
  const { origin, destination } = usePosition(); // เพิ่ม routeInfo จาก Context
  const [originAddress, setOriginAddress] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState(null);
  
  const { routeInfo } = useRouteInfo(); 

  // ฟังก์ชันเพื่อดึงที่อยู่จาก Lat/Lng
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
  
  return (
    <div className="details-container">

      <div className="details-location-container">
        <div className="location-icon">
            <div className="location-circle"></div>
            <i class="bi bi-geo-alt"></i>
        </div>
        <div className="location">
          <span className="location-text">
              {originAddress ? `${originAddress}` 
              : "กำลังโหลดตำแหน่งต้นทาง..."}
          </span>
          <span className="location-text">
              {destinationAddress ? `${destinationAddress}` 
              : "กำลังโหลดเลือกตำแหน่งปลายทาง..."}
          </span>
        </div>
      </div>

      <div className="details-tab">
          <div className="details-details-2">
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
          <div className="details-car">
            <div className="car2-image">
              <img src="cardark.png"/>
            </div>
            
            {/* รอเอาข้อมูลจากหน้าก่อนมาใส่ */}
            <div className="car2-info">
              <p>กก-9877 </p>
              <p>กรุงเทพมหานคร</p>
            </div>
          </div>
      </div>
      
      <div className="details-button">
        {/* <Link to='/call/offer'>
          <Button
              onClick={() => setTab('offer')}>
              เรียกทันที
          </Button>
        </Link> */}
        <Button
              variant="success"
              onClick={() => setTab('offer')}>
              เรียกทันที
          </Button>
      </div>
    </div>
  );
}

export default Details;
