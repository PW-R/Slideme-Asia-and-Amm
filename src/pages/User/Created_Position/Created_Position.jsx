import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Created_Position.css";

import { usePosition } from "../../../data/PositionContext";

function Created_Position() {

  const navigate = useNavigate();
  const { setCallback, setCurrentPosition } = usePosition();
  const [buttonPositions, setButtonPositions] = useState([
    { position: null, address: null },
    { position: null, address: null }, 
    { position: null, address: null }, 
  ]);

  // ฟังก์ชันเมื่อกดปุ่มเลือกตำแหน่ง
  const handleNavigateToMap = (index) => {
    const existingPosition = buttonPositions[index].position;
    setCurrentPosition(existingPosition); 
    setCallback((newPosition, newAddress) => {
      const updatedPositions = [...buttonPositions];
      updatedPositions[index] = { position: newPosition, address: newAddress };
      setButtonPositions(updatedPositions);
    });

    navigate("/map_created_position", { state: { type: `position-${index + 1}` } });
  };

  return (
    <div className="created-position-container">
      <div className="title">


        {/* ลิ้งไปหน้า user */}
        <Link to="/search">
            <i class="bi bi-chevron-left"></i>
        </Link>
        <h1>ตำแหน่งที่สร้างไว้</h1>

        
      </div>

      {/* ปุ่มเลือกตำแหน่ง */}
      <div className="position-container">
        {buttonPositions.map((position, index) => (
          <div key={index}>
            <button
              onClick={() => handleNavigateToMap(index)}
              className="position-button">
              <p>ตำแหน่งที่ {index + 1}</p>
              {position.position && <span>{position.address || "ตำแหน่งที่เลือก"}</span>}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Created_Position;
