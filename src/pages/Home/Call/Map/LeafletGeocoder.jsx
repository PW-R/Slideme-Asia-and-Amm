import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder";
import { useRouteInfo } from "../../../../data/PositionContext"; // เข้าถึง Context เพื่อเก็บข้อมูล

const LeafletGeocoder = ({ origin, destination }) => {
  const map = useMap();
  const { setRouteInfo } = useRouteInfo(); // ฟังก์ชันในการตั้งค่า routeInfo

  // ไอคอนสำหรับต้นทาง
  const originIcon = L.divIcon({
    className: "leaflet-div-icon",
    html: `<div style="background-color: red; width: 32px; height: 32px; border-radius: 50%; border: 2px solid white;"></div>`,
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
    if (origin && destination) {
      // ลบ Routing Control เก่า (ถ้ามี)
      map.eachLayer((layer) => {
        if (layer.options?.name === "RoutingControl") {
          map.removeLayer(layer);
        }
      });

      // เพิ่ม Routing Control ใหม่
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(origin[0], origin[1]),
          L.latLng(destination[0], destination[1]),
        ],
        lineOptions: {
          styles: [{ color: "blue", weight: 4, opacity: 0.7 }],
        },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false, // ปิดการแสดงเส้นทางอื่น
        name: "RoutingControl",
        show: false, // ซ่อน Panel ที่แสดงข้อมูลระยะทางและเวลา
        createMarker: () => null, // ไม่ให้ leaflet สร้าง marker เอง
      });

      // เมื่อคำนวณเส้นทางเสร็จสิ้น
      routingControl.on("routesfound", (event) => {
        const route = event.routes[0];
        const distance = route.summary.totalDistance / 1000; // ระยะทางเป็นกิโลเมตร
        const time = route.summary.totalTime / 60; // เวลาเป็นนาที

        // ตั้งค่า routeInfo ใน Context
        setRouteInfo({
          distance: distance.toFixed(2), // ปรับให้เป็นทศนิยม 2 ตำแหน่ง
          time: time.toFixed(0), // ปรับให้เป็นจำนวนเต็ม
        });
      });

      routingControl.addTo(map); // เพิ่ม Routing Control ลงในแผนที่

      // ซ่อนกรอบที่แสดงข้อมูล
      const controlContainer = routingControl.getContainer();
      if (controlContainer) {
        controlContainer.style.display = "none"; // ซ่อนกรอบข้อมูล
      }

      // เพิ่ม Marker สำหรับต้นทางและปลายทางพร้อมกับไอคอนที่กำหนดเอง
      if (origin) {
        L.marker(origin, { icon: originIcon }).addTo(map).bindPopup("ตำแหน่งต้นทาง");
      }

      if (destination) {
        L.marker(destination, { icon: customIcon }).addTo(map).bindPopup("ตำแหน่งปลายทาง");
      }

      return () => {
        map.removeControl(routingControl);
      };
    }
  }, [map, origin, destination, setRouteInfo]); // ต้องมี setRouteInfo ใน dependencies

  return null;
};

export default LeafletGeocoder;
