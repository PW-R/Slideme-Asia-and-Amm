// import React, { useEffect } from "react";
// import L from "leaflet";
// import { useMap } from "react-leaflet";
// const LeafletGeocoder = () => {
//   const map = useMap();
//   useEffect(() => {
//     L.Control.geocoder({
//       defaultMarkGeocode: false,
//     })
//       .on("markgeocode", function (e) {
//         var latlng = e.geocode.center;
//         L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
//         map.fitBounds(e.geocode.bbox);
//       })
//       .addTo(map);
//   }, []);
//   return null;
// };

// export default LeafletGeocoder;


import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder";

const LeafletGeocoder = ({ onSelectStart, onSelectEnd }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
      position: "topleft", // กำหนดตำแหน่งการแสดงปุ่มค้นหา
    });

    // เมื่อคลิกเลือกตำแหน่งต้นทาง
    geocoder.on("markgeocode", (e) => {
      const latlng = e.geocode.center;

      // แสดงตำแหน่งต้นทาง
      onSelectStart(latlng);
      L.marker(latlng)
        .addTo(map)
        .bindPopup(`<b>ตำแหน่งต้นทาง: ${e.geocode.name}</b>`)
        .openPopup();

      // ทำการ zoom เข้าไปที่ตำแหน่งที่เลือก
      map.fitBounds(e.geocode.bbox);
    });

    // เมื่อต้องการเลือกปลายทาง
    geocoder.on("markgeocode", (e) => {
      const latlng = e.geocode.center;

      // แสดงตำแหน่งปลายทาง
      onSelectEnd(latlng);
      L.marker(latlng)
        .addTo(map)
        .bindPopup(`<b>ตำแหน่งปลายทาง: ${e.geocode.name}</b>`)
        .openPopup();

      // ทำการ zoom เข้าไปที่ตำแหน่งที่เลือก
      map.fitBounds(e.geocode.bbox);
    });

    geocoder.addTo(map);
  }, [map, onSelectStart, onSelectEnd]);

  return null;
};

export default LeafletGeocoder;
