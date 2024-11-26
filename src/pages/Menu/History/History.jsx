import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { fetchDriverforUser } from "../../../data/DriverforUser"; // สมมติว่า fetchDriverforUser เป็นฟังก์ชันที่ดึงข้อมูล


import './History.css'

const initPage = "home";

const data = {
    progress: null, // หรือ []
};

function History({data}) {
    const [shuffledData, setShuffledData] = useState([]); // เก็บข้อมูลที่สุ่มแล้ว

    const [driverData, setDriverData] = useState([]);  // เก็บข้อมูลที่ดึงมา
    const [tab, setTab] = useState(initPage);

    // ใช้ useEffect เพื่อดึงข้อมูลจาก fetchDriverforUser
    useEffect(() => {
        const fetchData = async () => {
            const dataFromApi = await fetchDriverforUser();  // ดึงข้อมูลจากฟังก์ชัน
            setDriverData(dataFromApi);  // เก็บข้อมูลที่ดึงมาใน state
        };

        fetchData();  // เรียกใช้งานฟังก์ชัน
    }, []);  // [] ทำให้ run ครั้งเดียวเมื่อ component mount

    useEffect(() => {
        if (driverData.length > 0) {
            const shuffled = driverData.sort(() => Math.random() - 0.5); // สุ่มข้อมูล
            setShuffledData(shuffled.slice(0, 2)); // เก็บแค่ 2 ข้อมูลแรกหลังจากสุ่ม
        }
    }, [driverData]);  // รันเมื่อ driverData เปลี่ยนแปลง

    if (shuffledData.length === 0) {
        return <p>ไม่มีข้อมูล</p>; // แสดงข้อความเมื่อไม่มีข้อมูล
    }


    return ( 
        <div className="container">
            {shuffledData.map((item) => ( // แสดงข้อมูลที่สุ่มมา
            // {driverData.slice(0, 2).map((item) => ( // ใช้ slice เพื่อแสดงแค่ 2 ข้อมูล
                <div className='history-tab' key={item.id}>

                    <div className='profile-driver'>
                        <div className="circle-image"></div>
                        <i class="bi bi-check-circle-fill"></i>
                    </div>

                    <div className='detail'>
                        <h1>{item.workplace}</h1>
                        <p>{item.serviceDate}</p>
                        <p>฿{item.servicePrice}</p>
                    </div>

                    <div className='book-again'>
                        <Link to="/call" onClick={() => setTab('call')}>
                            <p>book again</p>
                        </Link>
                    </div>
                    
                </div>
            ))}


        </div>

     );
}

export default History;