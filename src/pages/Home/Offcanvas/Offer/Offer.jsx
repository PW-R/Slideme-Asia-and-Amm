import { useState, useEffect, useRef } from "react";
import { Link,Outlet} from 'react-router-dom';
import { Button, Offcanvas } from "react-bootstrap";

import './Offer.css'

function offer() {
    const [tab, setTab] = useState('offer');

    const offers = [
        { id: 1, title: "ร้าน A", date: "01/11/2024", price: 1500 },
        { id: 2, title: "ร้าน B", date: "15/11/2024", price: 2000 },
        { id: 3, title: "ร้าน C", date: "20/11/2024", price: 1800 }
    ];

    // useEffect(() => {
    //     // ตัวอย่างการดึงข้อมูลจาก API
    //     fetch('https://api.example.com/offers') // ใช้ URL ของ API ที่คุณต้องการ
    //         .then(response => response.json())
    //         .then(data => setOffers(data)) // ตั้งค่าข้อมูลใน state
    //         .catch(error => console.error('Error fetching offers:', error));
    // }, []);

    return ( 
        
        <div className='offer-container'>

            {offers.length === 0 ? (
                <p>Loading offers...</p> // แสดงข้อความโหลดข้อมูล
            ) : (
                offers.map((offer, index) => (

                <div className='offer-tab' key={index}>

                    <div className='offer-profile-driver'>
                        <i class="bi bi-bookmark-fill"></i>
                        <div className="p-circle-image"></div>
                    </div>

                    <div className='offer-detail'>
                        <h1>{offer.title}</h1>
                        <p>{offer.date}</p>
                    </div>

                    <div className='offer-choose'>
                        <p>฿{offer.price}</p>

                        <Link to='/summon'>
                            <button 
                                className={'btn ' + (tab === 'summon' ?  'btn-primary' :
                                'btn-outline-primary')}
                                onClick={() => setTab('summon')}
                                style={{
                                    backgroundColor: tab === 'summon' ? '#0dc964' : '#0dc964', // สีพื้นหลัง
                                    color: tab === 'summon' ? '#FFFFFF' : '#FFFFFF', // สีตัวอักษร
                                    borderRadius: '50px',
                                    padding: '2px 20px', 
                                }}
                                >
                                เลือก
                            </button>
                        </Link>
                    </div>
                </div>
                ))
            )}

        </div>
     );
}

export default offer;