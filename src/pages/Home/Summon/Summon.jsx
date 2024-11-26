import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Button, Carousel } from "react-bootstrap";
import { usePosition } from "../../../data/PositionContext";
import './Summon.css'

function Summon({ currentLocation, priceDetails, serviceInfo, ...props }) {
    const [tab, setTab] = useState('summon');
    const { origin, destination } = usePosition();
    const [originAddress, setOriginAddress] = useState(null);
    const [destinationAddress, setDestinationAddress] = useState(null);
  
    const location = useLocation();
    // const { setSelectedOffer } = location.state || {};  // Getting selectedOffer from location state
    const [selectedOffer, setSelectedOffer] = useState(null);

    const total = selectedOffer?.servicePrice - selectedOffer?.discount;
    const navigate = useNavigate();  // Using navigate for programmatic navigation

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

    // const handleGoToInformation = () => {
    //     // Navigate to the Information page and pass selectedOffer through state
    //     navigate('/information', {
    //         state: { selectedOffer }  
    //     });
    // };

    const handleGoToInformation = () => {
        // เก็บข้อมูล selectedOffer ใน sessionStorage
        sessionStorage.setItem('selectedOffer', JSON.stringify(selectedOffer));
        navigate('/information', {
            state: { selectedOffer }  
        });
    };

        // ดึงข้อมูล selectedOffer จาก sessionStorage ถ้ามี
        useEffect(() => {
            const storedOffer = sessionStorage.getItem('selectedOffer');
            if (storedOffer) {
                setSelectedOffer(JSON.parse(storedOffer));
            }
        }, []);

        useEffect(() => {
            if (location.state?.selectedOffer) {
                setSelectedOffer(location.state.selectedOffer);  // เก็บข้อมูลคนขับ
            }
        }, [location.state]);

        const handleGoToTracking = () => {
            // เก็บข้อมูล selectedOffer ใน sessionStorage
            sessionStorage.setItem('selectedOffer', JSON.stringify(selectedOffer));
            navigate('/tracking', {
                state: { selectedOffer }, // ส่งข้อมูลไปยังหน้า Tracking
            });
        };
    
        
    return ( 
        <div className="summon-container">
            <div className="title">
                <Link 
                    to='/call'
                    onClick={() => setTab('call')}
                >
                    <i className="bi bi-caret-left-fill"></i>
                </Link>
                <h1>เรียกรถสไลด์</h1>
            </div>

            {/* เลือกตำแหน่ง */}
            <div className="location-container">
                <div className="location-icon">
                    <div className="location-circle"></div>
                    <i className="bi bi-geo-alt"></i>
                </div>
                <div className="location">
                    <span className="location-text">
                        {originAddress ? `${originAddress}` : "กำลังโหลดตำแหน่งต้นทาง..."}
                    </span>
                    <span className="location-text">
                        {destinationAddress ? `${destinationAddress}` : "กำลังโหลดเลือกตำแหน่งปลายทาง..."}
                    </span>
                </div>
            </div>

            {/* 3 ปุ่ม */}
            <div className='summon-3btn'>
                <button onClick={handleGoToInformation}>
                    ข้อมูลผู้ให้บริการ
                </button>
                <Link>
                    <button 
                        className={tab === 'information' ? 'btn btn-success' : 'btn btn-outline-success'}
                        onClick={() => window.location.href = 'tel:+0682538888'}
                    >
                        โทรหาผู้ให้บริการ
                    </button>
                </Link>
                <Link to='/chat'>
                    <button 
                        className={tab === 'information' ? 'btn btn-success' : 'btn btn-outline-success'}
                    >
                        ส่งข้อความ
                    </button>
                </Link>
            </div>

            {/* โฆษณา */}
            <div className="summon-advert">
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img className="d-block w-100" src="./car.png" alt="First slide"/>
                    </Carousel.Item>
                    <Carousel.Item interval={1000}>
                        <img className="d-block w-100" src="./car2.png" alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item interval={1000}>
                        <img className="d-block w-100" src="./car3.png" alt="Third slide"/>
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* detail */}
            <div className="summon-detail">
                <p>ค่าบริการ ฿{selectedOffer?.servicePrice}</p>
                <p>ส่วนลด 
                    <span className="discount">-฿{selectedOffer?.discount}</span> 
                </p>
                <p>รวมทั้งหมด ฿{total} </p>
                <p>สถานนะ
                    <span className="status">รอการชำระเงิน</span> 
                </p>
            </div>

            {/* 2 ปุ่ม */}
            <div className="summon-btn">
                <Link to='/tracking'>
                    <button 
                        className={'btn ' + (tab === 'tracking' ?  'btn-success' : 'btn-outline-success')}
                        onClick={handleGoToTracking }
                    >
                        ชำระเงิน
                    </button>
                </Link>

                <Link to='/call'>
                    <button 
                        className={'btn ' + (tab === '/call' ?  'btn-danger' : 'btn-outline-danger')}
                        onClick={() => setTab('/call')}
                        style={{backgroundColor: tab === '/call' ? '#ff3636' : '#ff3636'}}
                    >
                        ยกเลิก
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Summon;
