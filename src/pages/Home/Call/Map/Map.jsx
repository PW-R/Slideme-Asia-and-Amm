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
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer.options.icon) {
          map.removeLayer(layer); 
        }
      });

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