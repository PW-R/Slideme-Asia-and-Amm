import { useState, useEffect, useRef } from "react";
import { Link,Outlet} from 'react-router-dom';
import { Button, Carousel } from "react-bootstrap";

import { usePosition } from "../../../data/PositionContext";

import './Summon.css'

function Summon({ currentLocation, priceDetails, serviceInfo, ...props }) {

    const [tab, setTab] = useState('summon'); 

    const [location, setLocation] = useState(currentLocation || 'ตำแหน่งไม่ระบุ'); // ถ้าไม่มีการส่ง currentLocation จะตั้งค่าเป็น 'ตำแหน่งไม่ระบุ'
    const [price, setPrice] = useState(priceDetails || { total: 0, discount: 0 }); // ราคาและส่วนลด
    const [service, setService] = useState(serviceInfo || { name: '', phone: '' }); // ข้อมูลบริการ

    const { origin, destination } = usePosition(); // ใช้ Context เพื่อดึงตำแหน่งต้นทางและปลายทาง
    const [originAddress, setOriginAddress] = useState(null);
    const [destinationAddress, setDestinationAddress] = useState(null);
  
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
        <div className="summon-container">

            <div className="title">
                <Link 
                    to='/call'
                    onClick={() => setTab('call')}
                    >
                    <i className="bi bi-caret-left-fill" ></i>
                </Link>
                <h1>เรียกรถสไลด์</h1>
            </div>

            {/* เลือกตำแหน่ง */}
            <div className="location-container">
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

            {/* 3 ปุ่ม */}
            <div className='summon-3btn'>
                <Link to='/information'>
                    <button 
                        className={tab === 'information' ? 'btn btn-success' : 'btn btn-outline-success'}>
                        ข้อมูลผู้ให้บริการ
                    </button>
                </Link>
                <Link>
                    <button 
                        className={tab === 'information' ? 'btn btn-success' : 'btn btn-outline-success'}
                        onClick={() => window.location.href = 'tel:+0682538888'}>
                        โทรหาผู้ให้บริการ
                    </button>
                </Link>
                <Link to='/chat'>
                    <button 
                        className={tab === 'information' ? 'btn btn-success' : 'btn btn-outline-success'}>
                        ส่งข้อความ
                    </button>
                </Link>
            </div>

            {/* โฆษณา */}
            <div className="summon-advert">
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img className="d-block w-100"
                            src="./car.png"
                            alt="First slide"/>
                    </Carousel.Item>

                    <Carousel.Item interval={1000}>
                        <img className="d-block w-100"
                            src="./car2.png"
                            alt="Second slide"/>
                    </Carousel.Item>

                    <Carousel.Item interval={1000}>
                        <img className="d-block w-100"
                            src="./car3.png"
                            alt="Third slide"/>
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* detail */}
            <div className="summon-detail">
                <p>ค่าบริการ ฿{price.total}</p>
                <p>ส่วนลด 
                    <span className="discount">-฿{price.discount}</span> 
                </p>
                <p>รวมทั้งหมด ฿{price.total - price.discount}</p>
                <p>สถานนะ
                    <span className="status">รอการชำระเงิน</span> 
                </p>
            </div>

            {/* 2 ปุ่ม */}
            <div className="summon-btn">
                <Link to='/tracking'>
                    <button 
                        className={'btn ' + (tab === 'tracking' ?  'btn-success' :
                        'btn-outline-success')}
                        onClick={() => setTab('tracking')}
                        >
                        ชำระเงิน
                    </button>
                </Link>

                <Link to='/call'>
                    <button 
                        className={'btn ' + (tab === '/call' ?  'btn-danger' :
                        'btn-outline-danger')}
                        onClick={() => setTab('/call')}
                        style={{
                            backgroundColor: tab === '/call' ? '#ff3636' : '#ff3636', // สีพื้นหลัง
                            color: tab === '/call' ? '#ffffff' : '#ffffff', 
                        }}
                        >
                        ยกเลิก
                    </button>
                </Link>
            {/* </div> */}
            </div>
        </div>
    );
}

export default Summon;