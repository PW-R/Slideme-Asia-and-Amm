import { useState, useEffect, useRef } from "react";
import { Link,Outlet} from 'react-router-dom';
import { Button, Offcanvas } from "react-bootstrap";

import './Summon.css'

function Summon({ currentLocation, priceDetails, serviceInfo, ...props }) {

    const [tab, setTab] = useState('summon'); 

    const [location, setLocation] = useState(currentLocation || 'ตำแหน่งไม่ระบุ'); // ถ้าไม่มีการส่ง currentLocation จะตั้งค่าเป็น 'ตำแหน่งไม่ระบุ'
    const [price, setPrice] = useState(priceDetails || { total: 0, discount: 0 }); // ราคาและส่วนลด
    const [service, setService] = useState(serviceInfo || { name: '', phone: '' }); // ข้อมูลบริการ

    // หากคุณต้องการดึงข้อมูลจาก API
    useEffect(() => {
        // ตัวอย่างการดึงข้อมูล (สามารถใช้ API จริงได้)
        // fetch('/api/summon') // เรียก API
        //     .then(response => response.json())
        //     .then(data => {
        //         setLocation(data.location);
        //         setPrice(data.priceDetails);
        //         setService(data.serviceInfo);
        //     })
        //     .catch(error => console.error('Error:', error));
    }, []);


    return ( 
        <div className="summon-container">

            <div className="title">
                <Link 
                    to='/home/call'
                    onClick={() => setTab('call')}
                    >
                    <i className="bi bi-caret-left-fill" ></i>
                </Link>
                <h1>เรียกรถสไลด์</h1>
            </div>

            <div className="summon-outlet">

                <div className="location-container">
                    <p>ตำแหน่งปัจจุบัน</p> &nbsp;
                    <p>ตำแหน่ง</p>
                </div>

                <div className='summon-3btn'>
                    <Link to='/information'>
                        <button 
                            className={'btn ' + (tab === 'information' ?  'btn-success' :
                            'btn-outline-success')}
                            onClick={() => setTab('information')}
                            >
                            ข้อมูลผู้ให้บริการ
                        </button>
                    </Link>

                    <Link>
                        <button 
                            className="btn btn-success" 
                            onClick={() => window.location.href = 'tel:+0682538888'}>
                            โทรหาผู้ให้บริการ
                        </button>
                    </Link>

                    <Link to='/chat'>
                        <button 
                            className={'btn ' + (tab === 'chat' ?  'btn-success' :
                            'btn-outline-success')}
                            onClick={() => setTab('chat')}
                            >
                            ส่งข้อความ
                        </button>
                    </Link>
                </div>

                <div className="summon-advert"></div>

                <div className="summon-detail">
                    <p>ทั้งหมด ฿{price.total}</p>
                    <p>ส่วนลด 
                        <span className="discount">-฿{price.discount}</span> 
                    </p>
                    <p>รวมทั้งหมด ฿{price.total - price.discount}</p>
                    <p>สถานนะ รอการชำระเงิน</p>
                </div>

                <div className="summon-btn">

                    <Link to='/menu'>
                        <button 
                            className={'btn ' + (tab === 'menu' ?  'btn-success' :
                            'btn-outline-success')}
                            onClick={() => setTab('menu')}
                            >
                            ชำระเงิน
                        </button>
                    </Link>

                    <Link to='/home/call/offcanvas/offer'>
                        <button 
                            className={'btn ' + (tab === '/home/call/offcanvas/offer' ?  'btn-danger' :
                            'btn-outline-danger')}
                            onClick={() => setTab('/home/call/offcanvas/offer')}
                            style={{
                                backgroundColor: tab === '/home/call/offcanvas/offer' ? '#ff3636' : '#ff3636', // สีพื้นหลัง
                                color: tab === '/home/call/offcanvas/offer' ? '#ffffff' : '#ffffff', 
                            }}
                            >
                            ยกเลิก
                        </button>
                    </Link>

                </div>
            </div>

        </div>
     );
}

export default Summon;