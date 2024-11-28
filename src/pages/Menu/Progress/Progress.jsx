import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from 'react-router-dom';
import { Button, Offcanvas } from "react-bootstrap";

import { usePosition } from "../../../data/PositionContext";

import './Progress.css'

function Progress({ data, selectedDriver }) {

    const location = useLocation();
    const selectedOffer = location.state?.selectedOffer || null;

  if (!selectedOffer) {
    return <p>ไม่มีข้อมูลการเรียกรถสไลด์</p>;
  }

    return ( 

        <div className="container">
                <div className='progress-tab' >
                    <div className='progress-profile-driver'>
                        <i class="bi bi-geo-alt-fill"></i>
                        <img src="driver.png" alt="โปรไฟล์คนขับ" />
                    </div>
                    <div className='detail'>
                        <h1>{selectedOffer?.workplace || "ไม่มีชื่อร้าน"}</h1>
                        <p>{selectedOffer?.serviceDate || "ไม่มีวันที่"}</p>
                        <p>฿{selectedOffer?.servicePrice || "ไม่มีราคา"}</p>
                    </div>
                    <div className='in_progress'>
                        <Link 
                            to="/tracking"
                            onClick={() => setTab('tracking')}>
                            <p>กำลังดำเนินการ</p>
                        </Link>
                    </div>
                </div>
        </div>
     );
}

export default Progress;