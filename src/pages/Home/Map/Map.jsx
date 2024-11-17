// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet"; 
// import "leaflet/dist/leaflet.css"; 
// import "leaflet-control-geocoder/dist/Control.Geocoder.css"
// import "leaflet-control-geocoder/dist/Control.Geocoder.js"

// import React, { useState } from "react"; 
// import LeafletGeocoder from "./LeafletGeocoder";
// import LeafletRoutingMachine from "./LeafletRoutingMachine";

// import './Map.css'

// function Map() {

//     const position = [13.7367, 100.5238]; 
//     const [startPoint, setStartPoint] = useState(null);

//     const handleStartPoint = (location) => {
//         setStartPoint(location);
//     };

//     return (

//         <div className="map-container">
            
//             <MapContainer 
//                 center={position} 
//                 zoom={6} 
//                 scrollWheelZoom={true}
//                 style={{ 
//                     width: "402px",    
//                     height: "874px"    
//                 }}>
                
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />

//                 {startPoint && (
//                     <Marker position={[startPoint.lat, startPoint.lon]}>
//                         <Popup>ตำแหน่งต้นทาง</Popup>
//                     </Marker>
//                 )}

//                 {/* <Marker position={position}>
//                     <Popup>
//                         นี่คือตำแหน่งกลางแผนที่ประเทศไทย
//                     </Popup>
//                 </Marker> */}

//                 {/* <div className="leaflet-container">
//                     <LeafletGeocoder />
//                 </div> */}
                

//                 {/* <LeafletRoutingMachine /> */}

//             </MapContainer>
//         </div>
//     );

    
// }

// let defaultIcon = L.icon({
//     iconUrl: "/marker-icon.png",
//     iconSize: [25, 41],
//     iconAnchor: [10, 41],
//     popupAnchor: [2, -40],
// });

// L.Icon.prototype.options.icon = defaultIcon;

// export default Map;

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // เพิ่มการโหลด CSS ของ routing machine

import { useLocation } from "react-router-dom";
import './Map.css';

function Map() {
    const location = useLocation();
    const { start, end } = location.state || {}; // รับตำแหน่งต้นทางและปลายทางจาก state
    const mapRef = useRef();

    const [startPosition, setStartPosition] = useState(null);
    const [endPosition, setEndPosition] = useState(null);

    const position = [13.7367, 100.5238]; // ตำแหน่งเริ่มต้นแผนที่

    useEffect(() => {
        if (start) {
            setStartPosition([start.lat, start.lon]);  // ตั้งค่าตำแหน่งต้นทาง
        }

        if (end) {
            setEndPosition([end.lat, end.lon]);  // ตั้งค่าตำแหน่งปลายทาง
        }
    }, [start, end]);

    useEffect(() => {
        if (startPosition && endPosition) {
            const map = mapRef.current;

            // สร้างเส้นทางระหว่างต้นทางและปลายทาง
            L.Routing.control({
                waypoints: [
                    L.latLng(startPosition[0], startPosition[1]),
                    L.latLng(endPosition[0], endPosition[1])
                ],
                routeWhileDragging: true
            }).addTo(map);  // เพิ่มเส้นทางบนแผนที่
        }
    }, [startPosition, endPosition]);

    return (
        <div className="map-container">
            <MapContainer
                center={position}
                zoom={12}
                scrollWheelZoom={true}
                style={{
                    width: "100%",
                    height: "100vh",
                }}
                whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
            >
                <TileLayer
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {startPosition && (
                    <Marker position={startPosition}>
                        <Popup>ตำแหน่งต้นทาง</Popup>
                    </Marker>
                )}

                {endPosition && (
                    <Marker position={endPosition}>
                        <Popup>ตำแหน่งปลายทาง</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}

export default Map;






// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// function Map() {
//   const position = [36.8065, 10.1815];

//   // ตั้งค่า Default Icon
//   let DefaultIcon = L.icon({
//     iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//   });

//   L.Marker.prototype.options.icon = DefaultIcon;

//   return (
//     <div className="map-container">
//       <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//           <Popup>Welcome to Tunis!</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }

// export default Map;


