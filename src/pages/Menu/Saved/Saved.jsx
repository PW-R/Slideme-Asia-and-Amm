import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { fetchDriverforUser } from "../../../data/DriverforUser"; 

import './Saved.css'

const initPage = "home";

function Saved({ data }) {
    const [driverData, setDriverData] = useState([]);  
    const [tab, setTab] = useState(initPage);

    useEffect(() => {
        const fetchData = async () => {
            const dataFromApi = await fetchDriverforUser(); 
           
            const enrichedData = dataFromApi.map(item => ({
                ...item,
                origin: "Central Plaza", 
                destination: "Terminal 21",
            }));
            setDriverData(enrichedData); 
        };
        fetchData();
    }, []);
    if (!Array.isArray(driverData) || driverData.length === 0) {
        return <p>ไม่มีข้อมูล</p>;
    }

    return ( 
        <div className="container">
            {driverData.slice(0, 2).map((item) => ( 
                <div className='saved-tab' key={item.id}>
                    <div className='s-profile-driver'>
                        <img src="driver.png" alt="โปรไฟล์คนขับ" />
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