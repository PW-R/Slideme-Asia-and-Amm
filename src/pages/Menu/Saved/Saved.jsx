import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchDriverforUser } from "../../../data/DriverforUser"; // สมมติว่า fetchDriverforUser เป็นฟังก์ชันที่ดึงข้อมูล

import './Saved.css'

const initPage = "home";

function Saved({ data }) {
    const [driverData, setDriverData] = useState([]);  // เก็บข้อมูลที่ดึงมา
    // const [shuffledData, setShuffledData] = useState([]); // เก็บข้อมูลที่สุ่มแล้ว
    const [tab, setTab] = useState(initPage);

    // ใช้ useEffect เพื่อดึงข้อมูลจาก fetchDriverforUser
    useEffect(() => {
        const fetchData = async () => {
            const dataFromApi = await fetchDriverforUser();  // ดึงข้อมูลจากฟังก์ชัน
            // เพิ่มต้นทางและปลายทางลงในข้อมูล
            const enrichedData = dataFromApi.map(item => ({
                ...item,
                origin: "Central Plaza", // กำหนดต้นทาง
                destination: "Terminal 21", // กำหนดปลายทาง
            }));
            setDriverData(enrichedData);  // เก็บข้อมูลที่เพิ่มข้อมูลต้นทาง-ปลายทางใน state
        };

        fetchData();  // เรียกใช้งานฟังก์ชัน
    }, []);  // [] ทำให้ run ครั้งเดียวเมื่อ component mount

    // สุ่มข้อมูลครั้งเดียวเมื่อ driverData ถูกโหลดแล้ว
    // useEffect(() => {
    //     if (driverData.length > 0) {
    //         const shuffled = driverData.sort(() => Math.random() - 0.5); // สุ่มข้อมูล
    //         setShuffledData(shuffled.slice(0, 2)); // เก็บแค่ 2 ข้อมูลแรกหลังจากสุ่ม
    //     }
    // }, [driverData]);  // รันเมื่อ driverData เปลี่ยนแปลง

    // if (shuffledData.length === 0) {
    //     return <p>ไม่มีข้อมูล</p>; // แสดงข้อความเมื่อไม่มีข้อมูล
    // }

    if (!Array.isArray(driverData) || driverData.length === 0) {
        return <p>ไม่มีข้อมูล</p>;
    }

    return ( 
        <div className="container">
            {/* {shuffledData.map((item) => ( // แสดงข้อมูลที่สุ่มมา */}
            {driverData.slice(0, 2).map((item) => ( // ใช้ slice เพื่อแสดงแค่ 2 ข้อมูล
                <div className='saved-tab' key={item.id}>

                    <div className='s-profile-driver'>
                        <div className="circle-image"></div>
                        <i className="bi bi-bookmark-fill"></i>
                    </div>

                    <div className='detail'>
                        <h1>{item.workplace}</h1>
                        <p>{item.serviceDate}</p>
                        <p>฿{item.servicePrice}</p>
                    </div>

                    <div className='book-again'>
                        <Link 
                            to={{
                                pathname: "/call",
                                // state: { 
                                //     origin: "Central Plaza", // ต้นทาง
                                //         destination: "Terminal 21", // ปลายทาง
                                // },
                            }}
                            onClick={() => setTab('call')}>
                            <p>book again</p>
                        </Link>
                    </div>
                    
                </div>
            ))}
        </div>
     );
}

export default Saved;
