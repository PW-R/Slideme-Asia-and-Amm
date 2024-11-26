import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Created_Position.css";

import { usePosition } from "../../../data/PositionContext";

function Created_Position() {

  const navigate = useNavigate();
  const { setCallback, setCurrentPosition } = usePosition();
  const [buttonPositions, setButtonPositions] = useState([
    { position: null, address: null }, // ตำแหน่งปุ่มที่ 1
    { position: null, address: null }, // ตำแหน่งปุ่มที่ 2
    { position: null, address: null }, // ตำแหน่งปุ่มที่ 3
  ]);

  // ฟังก์ชันเมื่อกดปุ่มเลือกตำแหน่ง
  const handleNavigateToMap = (index) => {
    const existingPosition = buttonPositions[index].position;
    setCurrentPosition(existingPosition); // บันทึกตำแหน่งปัจจุบันใน Context
    setCallback((newPosition, newAddress) => {
      const updatedPositions = [...buttonPositions];
      updatedPositions[index] = { position: newPosition, address: newAddress };
      setButtonPositions(updatedPositions); // เก็บข้อมูลตำแหน่งใหม่
    });

    navigate("/map_created_position", { state: { type: `position-${index + 1}` } });
  };

  return (
    <div className="created-position-container">
      <div className="title">
        <Link to="/search">
          <i className="bi bi-caret-left-fill"></i>
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
              {/* แสดงที่อยู่หากมีตำแหน่งที่บันทึกไว้ */}
              {position.position && <span>{position.address || "ตำแหน่งที่เลือก"}</span>}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Created_Position;
