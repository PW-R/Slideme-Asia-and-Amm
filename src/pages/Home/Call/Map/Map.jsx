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


import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useRef, useState } from "react";

import L from "leaflet";
import LeafletGeocoder from "./LeafletGeocoder";
import { usePosition } from "../../../../data/PositionContext";

import "./Map.css";

function Map() {
  const { origin, destination } = usePosition();
  const mapRef = useRef(null);
  const [loadingRoute, setLoadingRoute] = useState(true);
  const [routeError, setRouteError] = useState(null);

  // สร้างไอคอนสำหรับต้นทางเป็นวงกลมสีแดง
  const originIcon = L.divIcon({
    className: "leaflet-div-icon",
    html: `<div style="background-color: #F84C4C; width: 32px; height: 32px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // ไอคอนสำหรับปลายทาง
  const customIcon = L.divIcon({
    className: "leaflet-div-icon",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" stroke="gray" stroke-width="0.5" />
      </svg>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    if (origin && destination && mapRef.current) {
      const map = mapRef.current;

      setLoadingRoute(true);
      setRouteError(null);

      // ลบไอคอนเดิมที่อาจมีอยู่บนแผนที่
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer.options.icon) {
          map.removeLayer(layer); // ลบ Marker เดิมทั้งหมด
        }
      });

      // กำหนดเส้นทาง
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(origin[0], origin[1]),
          L.latLng(destination[0], destination[1]),
        ],
        routeWhileDragging: true,
        lineOptions: { styles: [{ color: "blue", weight: 6 }] },
        createMarker: () => null, // ไม่ให้ leaflet สร้าง marker เอง
        name: "RoutingControl",
        show: false,
      });

      routingControl.on("routesfound", (event) => {
        setLoadingRoute(false);
        if (event.routes.length === 0) {
          setRouteError("ไม่พบเส้นทาง");
        }
      });

      routingControl.on("routeerror", () => {
        setLoadingRoute(false);
        setRouteError("ไม่สามารถคำนวณเส้นทางได้");
      });

      routingControl.addTo(map);

      // ซ่อน Control Panel
      const controlContainer = routingControl.getContainer();
      if (controlContainer) {
        controlContainer.style.display = "none";
      }

      return () => {
        map.removeControl(routingControl);
      };
    }
  }, [origin, destination]);

  useEffect(() => {
    const removeControlPanels = () => {
      const containers = document.querySelectorAll(".leaflet-routing-container");
      containers.forEach((container) => (container.style.display = "none"));
    };

    removeControlPanels();
  }, [origin, destination]);

  return (
    <MapContainer
      center={origin || [13.7367, 100.5238]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      whenCreated={(map) => (mapRef.current = map)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {origin && (
        <Marker position={origin} icon={originIcon}>
          <Popup>ตำแหน่งต้นทาง</Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={destination} icon={customIcon}>
          <Popup>ตำแหน่งปลายทาง</Popup>
        </Marker>
      )}

      <div className="leaflet-container">
        <LeafletGeocoder origin={origin} destination={destination} />
      </div>
    </MapContainer>
  );
}

export default Map;






// function Map() {
//     const location = useLocation();
//     const { start, end } = location.state || {}; // รับตำแหน่งต้นทางและปลายทางจาก state
//     const mapRef = useRef();

//     const [startPosition, setStartPosition] = useState(null);
//     const [endPosition, setEndPosition] = useState(null);

//     const position = [13.7367, 100.5238]; // ตำแหน่งเริ่มต้นแผนที่

//     useEffect(() => {
//         if (start) {
//             setStartPosition([start.lat, start.lon]);  // ตั้งค่าตำแหน่งต้นทาง
//         }

//         if (end) {
//             setEndPosition([end.lat, end.lon]);  // ตั้งค่าตำแหน่งปลายทาง
//         }
//     }, [start, end]);

//     useEffect(() => {
//         if (startPosition && endPosition) {
//             const map = mapRef.current;

//             // สร้างเส้นทางระหว่างต้นทางและปลายทาง
//             L.Routing.control({
//                 waypoints: [
//                     L.latLng(startPosition[0], startPosition[1]),
//                     L.latLng(endPosition[0], endPosition[1])
//                 ],
//                 routeWhileDragging: true
//             }).addTo(map);  // เพิ่มเส้นทางบนแผนที่
//         }
//     }, [startPosition, endPosition]);

//     return (
//         <div className="map-container">
//             <MapContainer
//                 center={position}
//                 zoom={12}
//                 scrollWheelZoom={true}
//                 style={{
//                     width: "100%",
//                     height: "100vh",
//                 }}
//                 whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
//             >
//                 <TileLayer
//                     attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />

//                 {startPosition && (
//                     <Marker position={startPosition}>
//                         <Popup>ตำแหน่งต้นทาง</Popup>
//                     </Marker>
//                 )}

//                 {endPosition && (
//                     <Marker position={endPosition}>
//                         <Popup>ตำแหน่งปลายทาง</Popup>
//                     </Marker>
//                 )}
//             </MapContainer>
//         </div>
//     );
// }

// export default Map;






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


