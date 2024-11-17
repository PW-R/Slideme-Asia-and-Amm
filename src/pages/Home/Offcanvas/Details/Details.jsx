import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Details.css';

function Details() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  // ดึงข้อมูลจาก localStorage
  useEffect(() => {
    const storedPositions = JSON.parse(localStorage.getItem('positions')) || {};

    // หากมีข้อมูลตำแหน่งต้นทางและปลายทาง, ให้เก็บไว้ใน state
    if (storedPositions.origin) {
      setOrigin(storedPositions.origin);
    }

    if (storedPositions.destination) {
      setDestination(storedPositions.destination);
    }
  }, []);

  return (
    <div className="details-container">
      <div className="location-container">
        <p>ตำแหน่งต้นทาง: {origin ? `${origin[0]}, ${origin[1]}` : 'ยังไม่ได้เลือก'}</p>
        <p>ตำแหน่งปลายทาง: {destination ? `${destination[0]}, ${destination[1]}` : 'ยังไม่ได้เลือก'}</p>
      </div>

      <div className="car-container">
        <p>รถสไลด์ขนาดเล็ก</p>
      </div>
    </div>
  );
}

export default Details;
