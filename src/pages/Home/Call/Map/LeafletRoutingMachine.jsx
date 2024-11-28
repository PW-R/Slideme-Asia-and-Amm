import React, { useEffect } from "react";

import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";

const LeafletRoutingMachine = ({ origin, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (origin && destination) {
      map.eachLayer((layer) => {
        if (layer.options?.name === "RoutingControl") {
          map.removeLayer(layer);
        }
      });

      const carIcon = L.divIcon({
        className: "leaflet-div-icon",
        html: `<div style="background-color: white; width: 20px; height: 20px; border-radius: 50%; border: 2px solid black;"></div>`, // วงกลมสีขาวพร้อมขอบสีดำ
        iconSize: [30, 30], 
        iconAnchor: [10, 0], 
        popupAnchor: [0, -50], 
      });
      
      const carMarker = L.marker(origin, { icon: carIcon }).addTo(map);

      const routingControl = L.Routing.control({
        waypoints: [L.latLng(origin[0], origin[1]), L.latLng(destination[0], destination[1])],
        routeWhileDragging: false,
        lineOptions: { styles: [{ color: "blue", weight: 4, opacity: 0.7 }] },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        name: "RoutingControl",
        createMarker: () => null, 
        show: false,
      });

      routingControl.on("routesfound", function (e) {
        const route = e.routes[0];
        const coordinates = route.coordinates;

        let i = 0;
        const moveCar = () => {
          if (i < coordinates.length) {
            const { lat, lng } = coordinates[i];
            carMarker.setLatLng([lat, lng]); 
            i++;
            setTimeout(moveCar, 300); 
          }
        };
        moveCar();
      });

      routingControl.addTo(map);

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