import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Search.css';

function Search() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const navigate = useNavigate();

  // ดึงข้อมูลตำแหน่งต้นทางและปลายทางจาก localStorage ถ้ามี
  useEffect(() => {
    const storedPositions = JSON.parse(localStorage.getItem('positions')) || {};

    if (storedPositions.origin) {
      setOrigin(storedPositions.origin);
    }

    if (storedPositions.destination) {
      setDestination(storedPositions.destination);
    }
  }, []);

  // ฟังก์ชั่นเพื่อส่งตำแหน่งที่เลือกไปยังหน้า Map
  const handleNavigateToMap = (type) => {
    navigate('/map', { state: { type } });
  };

  return (
    <div className="search-container">
      <div className="title">
        <h1>ค้นหาสถานที่</h1>
      </div>

      <div className="location-container">
        {/* แสดงตำแหน่งต้นทาง */}
        <div>
          <p>ตำแหน่งต้นทาง:</p>
          <p>{origin ? `ตำแหน่งที่เลือก: ${origin[0]}, ${origin[1]}` : 'ยังไม่ได้เลือก'}</p>
          <button onClick={() => handleNavigateToMap('origin')}>เลือกตำแหน่งต้นทาง</button>
        </div>

        {/* แสดงตำแหน่งปลายทาง */}
        <div>
          <p>ตำแหน่งปลายทาง:</p>
          <p>{destination ? `ตำแหน่งที่เลือก: ${destination[0]}, ${destination[1]}` : 'ยังไม่ได้เลือก'}</p>
          <button onClick={() => handleNavigateToMap('destination')}>เลือกตำแหน่งปลายทาง</button>
        </div>
      </div>

      <div className="search-button">
        <Link to="/home/call">
          <button className="btn btn-outline-success">
            ค้นหา Slide me
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Search;
