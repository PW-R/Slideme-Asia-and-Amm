import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { fetchDriverforUser } from "../../../data/DriverforUser"; // สมมติว่า fetchDriverforUser เป็นฟังก์ชันที่ดึงข้อมูล

import './History.css'

const initPage = "home";

const data = {
    progress: null, 
};

function History({data}) {
    const [shuffledData, setShuffledData] = useState([]); 

    const [driverData, setDriverData] = useState([]);  
    const [tab, setTab] = useState(initPage);

    useEffect(() => {
        const fetchData = async () => {
            const dataFromApi = await fetchDriverforUser();  

            setDriverData(dataFromApi);  
        };

        fetchData(); 
    }, []);

    useEffect(() => {
        if (driverData.length > 0) {
            const shuffled = driverData.sort(() => Math.random() - 0.5); 
            setShuffledData(shuffled.slice(0, 2)); 
        }
    }, [driverData]);  

    if (shuffledData.length === 0) {
        return <p>ไม่มีข้อมูล</p>; 
    }

    return ( 
        <div className="container">
            {shuffledData.map((item) => ( 
                <div className='history-tab' key={item.id}>

                    <div className='progress-profile-driver'>
                        <img src="driver.png" alt="โปรไฟล์คนขับ" />
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