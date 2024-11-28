import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "react-bootstrap";

import { usePosition } from "../../../../data/PositionContext";
import { useRouteInfo } from "../../../../data/PositionContext";

import './Details.css';

function Details() {
  const { origin, destination } = usePosition(); // ดึงข้อมูลตำแหน่ง
  const { routeInfo } = useRouteInfo();          // ดึงข้อมูลเส้นทาง
  const [originAddress, setOriginAddress] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState(null);

  const navigate = useNavigate();

  const location = useLocation();
  const { selectedOffer } = location.state || {}; // ดึง selectedOffer มาจาก state

  // ฟังก์ชันดึงที่อยู่จาก Lat/Lng
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

  // ดึงที่อยู่เมื่อ `origin` และ `destination` เปลี่ยน
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

  // ฟังก์ชันที่จะใช้เมื่อกดปุ่ม "เรียกทันที"
  const handleGoToSummon = () => {
    if (selectedOffer) {
      navigate('/summon', {
        state: { selectedOffer }
      });
    }
  };

  return (
    <div className="details-container">
      {selectedOffer ? (
        <>
          {/* ตำแหน่งต้นทางและปลายทาง */}
          <div className="details-location-container">
            <div className="location-icon">
              <div className="location-circle"></div>
              <i className="bi bi-geo-alt"></i>
            </div>
            <div className="location">
              <span className="location-text">
                {originAddress ? originAddress : "กำลังโหลดตำแหน่งต้นทาง..."}
              </span>
              <span className="location-text">
                {destinationAddress ? destinationAddress : "กำลังโหลดตำแหน่งปลายทาง..."}
              </span>
            </div>
          </div>

          {/* ข้อมูลเส้นทาง */}
          <div className="details-tab">
            <div className="details-details-2">
              <p style={{ fontWeight: "bold" }} >{selectedOffer?.slideCarType || "ไม่มีประเภทของรถสไลด์"}</p>
              <p>
                <i className="bi bi-clock-fill"></i>
                {routeInfo?.time ? `${routeInfo.time} นาที` : "กำลังคำนวณ..."}
              </p>
              <p>
                <i className="bi bi-sign-turn-right-fill"></i>
                {routeInfo?.distance ? `${routeInfo.distance} km` : "กำลังคำนวณ..."}
              </p>
            </div>

            {/* ข้อมูลรถ */}
            <div className="details-car">
              <div className="car2-image">
                <img src="cardark.png" alt="รถ" />
              </div>

              <div className="car2-info">
                <p>{selectedOffer?.licensePlate || "ไม่มีข้อมูลคนขับ"}</p>
              </div>
            </div>
          </div>

          {/* ปุ่มเรียก */}
          <div className="details-button">
            <Button variant="success" onClick={handleGoToSummon}>
              เรียกทันที
            </Button>
          </div>
        </>
      ) : (
        <p>ไม่มีข้อมูลข้อเสนอ</p>
      )}
    </div>
  );
}

export default Details;
