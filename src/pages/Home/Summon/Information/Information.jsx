import { useState, useEffect, useRef } from "react";
import { Link,Outlet} from 'react-router-dom';
import { Button, Offcanvas } from "react-bootstrap";

import './Information.css'

function Information() {
    return ( 

        <div className='information-container'>
            <div className="title">
                <Link 
                    to='/summon'
                    onClick={() => setTab('summon')}>
                    <i className="bi bi-caret-left-fill"></i>
                </Link>
                <h1>ข้อมูลผู้ให้บริการ</h1>
            </div>

            {/* profile */}
            <div className='information-profile-driver'>
                <div className="driver-image">
                    <img src="driver.png"/>
                </div>

                <div className='information-name-driver'>
                    <h2>สมใจ สมดีนคร </h2>
                    <p>569-SM-8A2001</p>
                </div>
            </div>

            {/* rate */}
            <div className='information-number-container'>
                <div className="information-number">
                    <h2>12</h2>
                    <p>Order</p>
                </div>

                <div  className="information-number">
                    <h2>4.9</h2>
                    <p>Service</p>
                </div>

                <div className="information-number">
                    <h2>2024</h2>
                    <p>Year</p>
                </div>
            </div>

            {/* line */}
            <hr className="line-information" />

            {/* detail */}
            <div className='information-3-detail'>
                <p>
                    <i class="bi bi-file-earmark-person"></i>
                    สมใจ สมดีนคร 569-SM-8A2001
                </p>
                <p onClick={() => window.location.href = 'tel:+0682538888'}>
                    <i class="bi bi-telephone"></i>
                    096-235-8888
                </p>
                <p><i class="bi bi-geo-alt"></i>บ้าน</p>
            </div>

            {/* review  */}
            <div className='information-review-container'>
                <div className="information-review">
                    <p>ส่งเร็ว ตรงเวลา</p>
                    <p>4.0</p>
                </div>
                <div className="information-review">
                    <p>ราคาเป็นธรรม</p>
                    <p>3.9</p>
                </div>
                <div className="information-review">
                    <p>ปลอดภัย</p>
                    <p>4.2</p>
                </div>
                <div className="information-review">
                    <p>คนขับบุคลิคดี</p>
                    <p>4.5</p>
                </div>
            </div>
        </div>
     );
}

export default Information;