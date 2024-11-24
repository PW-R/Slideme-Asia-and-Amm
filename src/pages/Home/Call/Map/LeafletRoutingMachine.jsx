// import React, { useEffect } from "react";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import { useMap } from "react-leaflet";

// const LeafletRoutingMachine = () => {
//   const map = useMap();
//   let DefaultIcon = L.icon({
//     iconUrl: "/marche.gif",
//     iconSize: [90, 90],
//   });
//   useEffect(() => {
//     var marker1 = L.marker([36.8065, 10.1815], { icon: DefaultIcon }).addTo(
//       map
//     );
//     map.on("click", function (e) {
//       L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//       L.Routing.control({
//         waypoints: [
//           L.latLng(36.8065, 10.1815),
//           L.latLng(e.latlng.lat, e.latlng.lng),
//         ],
//         lineOptions: {
//           styles: [
//             {
//               color: "blue",
//               weight: 4,
//               opacity: 0.7,
//             },
//           ],
//         },
//         routeWhileDragging: false,
//         geocoder: L.Control.Geocoder.nominatim(),
//         addWaypoints: false,
//         draggableWaypoints: false,
//         fitSelectedRoutes: true,
//         showAlternatives: true,
//       })
//         .on("routesfound", function (e) {
//           e.routes[0].coordinates.forEach((c, i) => {
//             setTimeout(() => {
//               marker1.setLatLng([c.lat, c.lng]);
//             }, 1000 * i);
//           });
//         })
//         .addTo(map);
//     });
//   }, []);
//   return null;
// };

// export default LeafletRoutingMachine;


import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = ({ origin, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (origin && destination) {
      // ลบ routing control เดิม (ถ้ามี)
      map.eachLayer((layer) => {
        if (layer.options?.name === "RoutingControl") {
          map.removeLayer(layer);
        }
      });

      const carIcon = L.divIcon({
        className: "leaflet-div-icon",
        html: `<div style="background-color: white; width: 20px; height: 20px; border-radius: 50%; border: 2px solid black;"></div>`, // วงกลมสีขาวพร้อมขอบสีดำ
        iconSize: [30, 30], // ขนาดของไอคอน
        iconAnchor: [10, 0], // ช่วยในการตั้งตำแหน่งของไอคอน (anchor ที่ตรงกลางล่าง)
        popupAnchor: [0, -50], // กำหนดตำแหน่งของ popup
      });
      
      // สร้าง Marker สำหรับต้นทาง (origin) โดยใช้ carIcon ใหม่
      const carMarker = L.marker(origin, { icon: carIcon }).addTo(map);

      // เพิ่ม Routing Control
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(origin[0], origin[1]), L.latLng(destination[0], destination[1])],
        routeWhileDragging: false,
        lineOptions: { styles: [{ color: "blue", weight: 4, opacity: 0.7 }] },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        name: "RoutingControl",
        createMarker: () => null, // ป้องกันการสร้าง Marker โดย routing machine
        show: false, // ปิด Control Panel
      });

      routingControl.on("routesfound", function (e) {
        const route = e.routes[0];
        const coordinates = route.coordinates;

        let i = 0;
        const moveCar = () => {
          if (i < coordinates.length) {
            const { lat, lng } = coordinates[i];
            carMarker.setLatLng([lat, lng]); // ปรับตำแหน่งของ Marker
            i++;
            setTimeout(moveCar, 700); // สร้างการเคลื่อนไหวของ Marker
          }
        };
        moveCar();
      });

      routingControl.addTo(map);

      // ลบ Control Panel
      const controlContainer = document.querySelector(".leaflet-routing-container");
      if (controlContainer) {
        controlContainer.remove();
      }

      return () => {
        map.removeControl(routingControl);
        map.removeLayer(carMarker);
      };
    }
  }, [map, origin, destination]);

  return null;
};

export default LeafletRoutingMachine;



// import React, { useEffect } from "react";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet-control-geocoder";
// import { useMap } from "react-leaflet";

// const LeafletRoutingMachine = ({ origin, destination }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (origin && destination) {
//       // ลบ Routing Control เก่า (ถ้ามี)
//       map.eachLayer((layer) => {
//         if (layer.options?.name === "RoutingControl") {
//           map.removeLayer(layer);
//         }
//       });

//       // เพิ่ม Routing Control ใหม่
//       const routingControl = L.Routing.control({
//         waypoints: [
//           L.latLng(origin[0], origin[1]), 
//           L.latLng(destination[0], destination[1]),
//         ],
//         lineOptions: {
//           styles: [{ color: "blue", weight: 4, opacity: 0.7 }], // กำหนดสไตล์เส้นทาง
//         },
//         routeWhileDragging: false, // ไม่ต้องลากเส้นทาง
//         geocoder: L.Control.Geocoder.nominatim(), // ใช้ Geocoder สำหรับการคำนวณเส้นทาง
//         addWaypoints: false, // ไม่ต้องเพิ่ม waypoint เพิ่มเติม
//         draggableWaypoints: false, // ไม่ให้ลาก waypoint ได้
//         fitSelectedRoutes: true, // ปรับ zoom ให้เหมาะสมกับเส้นทาง
//         showAlternatives: true, // แสดงตัวเลือกเส้นทางอื่น (ถ้ามี)
//         name: "RoutingControl", // ตั้งชื่อ Routing Control เพื่อใช้อ้างอิง
//       });

//       routingControl.addTo(map); // เพิ่ม Routing Control ลงในแผนที่

//       return () => {
//         // ลบ Routing Control เมื่อ Component Unmount หรือ origin/destination เปลี่ยน
//         map.removeControl(routingControl);
//       };
//     }
//   }, [map, origin, destination]);

//   return null; // Component ไม่ต้อง render อะไรใน DOM
// };

// export default LeafletRoutingMachine;


