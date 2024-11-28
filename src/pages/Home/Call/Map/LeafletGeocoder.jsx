import { useEffect } from "react";

import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder";

import { useRouteInfo } from "../../../../data/PositionContext"; 

const LeafletGeocoder = ({ origin, destination }) => {
  const map = useMap();
  const { setRouteInfo } = useRouteInfo(); 

  const originIcon = L.divIcon({
    className: "leaflet-div-icon",
    html: `<div style="background-color: red; width: 32px; height: 32px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

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
      map.eachLayer((layer) => {
        if (layer.options?.name === "RoutingControl") {
          map.removeLayer(layer);
        }
      });

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
        showAlternatives: false, 
        name: "RoutingControl",
        show: false, 
        createMarker: () => null, 
      });

      routingControl.on("routesfound", (event) => {
        const route = event.routes[0];
        const distance = route.summary.totalDistance / 1000; 
        const time = route.summary.totalTime / 60; 

        // ตั้งค่า routeInfo ใน Context
        setRouteInfo({
          distance: distance.toFixed(2), 
          time: time.toFixed(0),
        });
      });

      routingControl.addTo(map); 

      // ซ่อนกรอบที่แสดงข้อมูล
      const controlContainer = routingControl.getContainer();
      if (controlContainer) {
        controlContainer.style.display = "none"; 
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
  }, [map, origin, destination, setRouteInfo]); 
  return null;
};

export default LeafletGeocoder;
