import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button, Offcanvas } from "react-bootstrap";

import Map from "./Map/Map";
import L from 'leaflet';

import { Outlet } from 'react-router';
import { usePosition } from "../../../data/PositionContext";

import './Call.css';

function Call() {
  const [tab, setTab] = useState('offer');
  const [show, setShow] = useState(true);
  const { origin, destination, driver } = usePosition();
//   const [isRouteReady, setIsRouteReady] = useState(false); // Track if route is ready
    
  const navigate = useNavigate();
  const location = useLocation();


//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

  console.log('Origin:', origin); 
  console.log('Destination:', destination); 

  const mapContainerRef = useRef(null); // Create a ref for the map container

  const handleShow = () => {
    setShow(true);
    setTab('offer');
  };

  const handleClose = () => setShow(false);

  // useEffect(() => {
  //   if (tab === 'offer') {      
  //     navigate('/call/offer');
  //   } else if (tab === 'details') {
  //     navigate('/call/details');
  //   }
  // }, [navigate, tab]);
  
  // const handleTabChange = (newTab) => {
  //   setTab(newTab); // เปลี่ยนค่า tab
  // };

  useEffect(() => {
    // ถ้ายังไม่มี path ที่กำหนด (อยู่ในหน้า `/call` โดยตรง) ให้เปลี่ยนไป `/call/offer`
    if (location.pathname === "/call") {
      navigate("/call/offer");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname.includes("/call/details")) {
      setTab("details");
    } else if (location.pathname.includes("/call/offer")) {
      setTab("offer");
    }
  }, [location.pathname]);
  
  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (newTab === "offer") {
      navigate("/call/offer");
    } else if (newTab === "details") {
      navigate("/call/details");
    }
  };
  
  

  useEffect(() => {
    if (origin && destination && mapContainerRef.current) {
      const map = L.map(mapContainerRef.current).setView(origin, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(origin[0], origin[1]), L.latLng(destination[0], destination[1])],
        routeWhileDragging: true,
        lineOptions: { styles: [{ color: 'blue', weight: 6 }] },
      });

      routingControl.on('routesfound', () => {
        setIsRouteReady(true);
      });

      routingControl.addTo(map);

      return () => {
        map.remove();
      };
    }
  }, [origin, destination]);

  return (

  <div className="app-container">
    <div className="call-container">

      <div className="title-map">
        <Link to='/search' onClick={() => setTab('search')}>
          <i className="bi bi-caret-left-fill"></i>
        </Link>
        <h1>เรียกรถสไลด์</h1>
      </div>

      {/* Map */}
      <div className="call-map">
        {origin && destination ? (
          <Map />
        ) : (
          <p className="alert">กรุณาเลือกตำแหน่งต้นทางและปลายทางก่อน</p>
        )}
      </div>

      <div className="call-tab">
        <div className="two-button">

          <button
            className={`nav-link ${tab === 'offer' ? 'active' : ''}`}
            onClick={() => handleTabChange('offer')}
            >
            Offer
          </button>
          
          <button
            className={`nav-link ${tab === 'details' ? 'active' : ''}`}
            onClick={() => handleTabChange('details')}
            >
            รายละเอียด
          </button>
        </div>
        
        <div className="call-outlet">
          <Outlet />
        </div>
    </div>





    {/* <div className="call-button">
      <Button 
        className={tab === 'information' ? 'btn btn-success' : 'btn btn-outline-success'}
        onClick={handleShow}>
        เรียกรถสไลด์
      </Button>
    </div> */}


        {/* <Offcanvas show={show} onHide={handleClose} placement="bottom"
            className="offcanvas" backdrop={false}>
            <Offcanvas.Header className="offcanvas-header">
              <button
                  className={`nav-link ${tab === 'details' ? 'active' : ''}`}
                  onClick={() => handleTabChange('details')}
                >
                  รายละเอียด
                </button>

                <button
                  className={`nav-link ${tab === 'offer' ? 'active' : ''}`}
                  onClick={() => handleTabChange('offer')}
                  >
                  Offer
                </button>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Outlet />
            </Offcanvas.Body>
        </Offcanvas> */}

        {/* <div className='call-list-container'>
                <ul className="nav nav-underline">

                    <li className="call-item" >
                        <Link 
                            to='details' 
                            className={`nav-link ${tab === 'details' ? 'active' : ''}`}
                            onClick={() => handleTabChange('details')}>
                            <p>รายละเอียด</p>
                        </Link>
                    </li>
                    <li className="call-item" >
                        <Link 
                            to='offer' 
                            className={`nav-link ${tab === 'offer' ? 'active' : ''}`}
                            onClick={() => handleTabChange('offer')}
                            >
                            <p>Offer</p>
                        </Link>
                    </li>
                </ul>    
                <Outlet />
            </div> */}

        {/* <div className="offcanvas-container">
          <Offcanvas show={show} onHide={handleClose} placement="bottom" 
                    >
            <Offcanvas.Body className="nav nav-underline">
              
              <div className="button-container">
                
                <button
                  className={`nav-link ${tab === 'details' ? 'active' : ''}`}
                  onClick={() => handleTabChange('details')}
                >
                  รายละเอียด
                </button>

                <button
                  className={`nav-link ${tab === 'offer' ? 'active' : ''}`}
                  onClick={() => handleTabChange('offer')}
                  >
                  Offer
                </button>

              </div>

            </Offcanvas.Body>

            <div className="outlett-container">
              <Outlet />
            </div>
          </Offcanvas>
        </div> */}

      {/* </div> */}
    </div>
    </div>
  );
}

export default Call;
