import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ===========================
   Fix Leaflet Marker Icons
=========================== */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

/* ===========================
   Fit Bounds to Routes
=========================== */
function FitBounds({ routes }) {
  const map = useMap();

  useEffect(() => {
    if (!routes.length) return;

    const bounds = [];
    routes.forEach(route => {
      route.geometry.coordinates.forEach(coord => {
        bounds.push([coord[1], coord[0]]);
      });
    });

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [routes, map]);

  return null;
}

/* ===========================
   Handle Map Clicks
=========================== */
function MapClickHandler({ setStart, setEnd }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setStart(prev => {
        if (!prev) return [lat, lng];
        setEnd([lat, lng]);
        return prev;
      });
    }
  });

  return null;
}

/* ===========================
   Main Component
=========================== */
function MapComponent() {
  const [routes, setRoutes] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const getRoute = async () => {
    if (!start || !end) {
      alert("Select start and end points on the map");
      return;
    }

    const startStr = `${start[1]},${start[0]}`;
    const endStr = `${end[1]},${end[0]}`;

    try {
      const response = await axios.get(
        `http://localhost:4000/route?start=${startStr}&end=${endStr}`
      );
      console.log(response.data)
      setRoutes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetPoints = () => {
    setStart(null);
    setEnd(null);
    setRoutes([]);
  };

  const routeStyles = [
    { color: "#22c55e", dashArray: null },      // green solid
    { color: "#3b82f6", dashArray: "10 10" },   // blue dashed
    { color: "#ef4444", dashArray: "3 8" },     // red dotted
  ];

  return (
    <div className="p-6 bg-linear-to-b from-[#FFEFEF] via-[#756AB6]/40 to-[#FFEFEF] min-h-screen">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">
        Jogging Route Selector
      </h2>

      {/* Instructions */}
      <div className="mb-3 text-sm text-gray-600">
         Click once to set <span className="font-semibold text-green-600">Start</span>,
        click again to set <span className="font-semibold text-red-600">End</span>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={getRoute}
          className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Find Routes
        </button>

        <button
          onClick={resetPoints}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden shadow-xl">
        <MapContainer
          center={[26.8467, 80.9462]}
          zoom={13}
          className="h-125 w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClickHandler setStart={setStart} setEnd={setEnd} />
          <FitBounds routes={routes} />

          {start && (
            <Marker position={start}>
              <Popup>Start Point</Popup>
            </Marker>
          )}

          {end && (
            <Marker position={end}>
              <Popup>End Point</Popup>
            </Marker>
          )}

          {routes.map((route, index) => {
            const positions = route.geometry.coordinates.map(
              coord => [coord[1], coord[0]]
            );

            const style = routeStyles[index % routeStyles.length];

            return (
              <Polyline
                key={index}
                positions={positions}
                color={style.color}
                dashArray={style.dashArray}
                weight={7}
                opacity={0.9}
              >
                <Popup>Route {index + 1}</Popup>
              </Polyline>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapComponent;
