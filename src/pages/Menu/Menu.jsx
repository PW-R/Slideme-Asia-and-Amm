import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

import Progress from "./Progress/Progress";
import Saved from "./Saved/Saved";
import History from "./History/History";

import './Menu.css'

const initData = {
    progress_history: [
        { id: 1, title: "ร้าน A", date: "01/11/2024", price: 1500, status: "กำลังดำเนินการ" },
        { id: 2, title: "ร้าน B", date: "15/11/2024", price: 2000, status: "Book Again" },
        { id: 3, title: "ร้าน C", date: "14/11/2024", price: 1800, status: "Book Again" },
    ],
    saved: [
        { id: 1, title: "ร้าน AA", date: "01/11/2024", price: 1500, status: "Book Again" },
        { id: 2, title: "ร้าน BB", date: "02/11/2024", price: 2000, status: "Book Again" },
    ],
};

function Menu() {
    const location = useLocation();
    const [tab, setTab] = useState("progress"); 
    const [data] = useState(initData);
    const [selectedDriver, setSelectedDriver] = useState(null); 

    useEffect(() => {
        if (location.state?.selectedDriver) {
            setSelectedDriver(location.state.selectedDriver); 
        }

        if (location.pathname === "/menu/progress") {
            setTab('progress');
        } else if (location.pathname === "/menu/saved") {
            setTab('saved');
        } else if (location.pathname === "/menu/history") {
            setTab('history');
        }
    }, [location]); 

    return (
        <div className="menu-container">
            <div className="title">

                {/* ลิ้งไปหน้า home */}
                <Link to='/search' onClick={() => setTab('search')}>
                    <i class="bi bi-chevron-left"></i>
                </Link>
                <h1>รายการ</h1>

                
            </div>

            <div className='menu-list-container'>
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link 
                            to='/menu/progress' 
                            className={`nav-link ${tab === 'progress' ? 'active' : ''}`} 
                            onClick={() => setTab('progress')}>
                            กำลังดำเนินการ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to='/menu/saved' 
                            className={`nav-link ${tab === 'saved' ? 'active' : ''}`} 
                            onClick={() => setTab('saved')}>
                            ที่บันทึกไว้
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to='/menu/history' 
                            className={`nav-link ${tab === 'history' ? 'active' : ''}`} 
                            onClick={() => setTab('history')}>
                            ประวัติ
                        </Link>
                    </li>
                </ul>    
            </div>

            <div className="outlett-container">
                {tab === "progress" && <Progress data={data.progress_history.filter(item => item.status === "กำลังดำเนินการ")} selectedDriver={selectedDriver} />}
                {tab === "saved" && <Saved data={data.saved} />}
                {tab === "history" && <History data={data.progress_history.filter(item => item.status === "Book Again")} />}
            </div>
        </div>
    );
}

export default Menu;

