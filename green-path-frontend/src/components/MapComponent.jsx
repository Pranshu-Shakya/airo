import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import {
  User,
  Activity,
  Bike,
  Timer,
  Route,
  Loader2,
  RotateCcw,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAiroMap } from "../Hooks/useMap";

/* ===========================
   Leaflet Icon Fix
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
   Health Risk Scale (ORDERED)
=========================== */
const ROUTE_STYLES = [
  {
    label: "Minimum",
    color: "#22c55e",
    dashArray: null,
  },
  {
    label: "Moderate",
    color: "#FFBF00",
    dashArray: "8 8",
  },
  {
    label: "High",
    color: "#ef4444",
    dashArray: "4 8",
  },
];

/* ===========================
   Age → Speed Table (km/h)
=========================== */
const SPEED_TABLE = {
  child: { jogging: 6, cycling: 12 },
  young: { jogging: 9, cycling: 20 },
  adult: { jogging: 8, cycling: 18 },
  mid: { jogging: 6, cycling: 14 },
  senior: { jogging: 4, cycling: 10 },
};

/* ===========================
   Helpers
=========================== */
const getAgeCategory = (age) => {
  if (age < 13) return "child";
  if (age <= 25) return "young";
  if (age <= 45) return "adult";
  if (age <= 60) return "mid";
  return "senior";
};

const formatDuration = (hours) => {
  const totalMinutes = Math.round(hours * 60);
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h} hr ${m} min`;
};

/* ===========================
   Fit Map to Routes
=========================== */
function FitBounds({ routes }) {
  const map = useMap();

  useEffect(() => {
    if (!routes.length) return;

    const bounds = routes.flatMap((r) =>
      r.geometry.coordinates.map((c) => [c[1], c[0]])
    );

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [routes, map]);

  return null;
}

/* ===========================
   Map Click Handler
=========================== */
function MapClickHandler({ setStart, setEnd }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setStart((prev) => {
        if (!prev) return [lat, lng];
        setEnd([lat, lng]);
        return prev;
      });
    },
  });
  return null;
}

/* ===========================
   MAIN COMPONENT
=========================== */
function MapComponent() {
  const [routes, setRoutes] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const [age, setAge] = useState("");
  const [mode, setMode] = useState("jogging");

  const { getRoutes, loading, error } = useAiroMap();

  const handleFindRoutes = async () => {
    if (!start || !end) {
      alert("Select start and end points");
      return;
    }

    const result = await getRoutes({
      startStr: `${start[1]},${start[0]}`,
      endStr: `${end[1]},${end[0]}`,
    });

    if (Array.isArray(result)) {
      setRoutes(result);
      setSelectedRoute(null);
    }
  };

  const handleReset = () => {
    setStart(null);
    setEnd(null);
    setRoutes([]);
    setSelectedRoute(null);
    setAge("");
  };

  /* ===========================
     Derived Data
  =========================== */
  const selected = selectedRoute !== null ? routes[selectedRoute] : null;

  const ageCategory = age ? getAgeCategory(Number(age)) : null;
  const speed =
    ageCategory && SPEED_TABLE[ageCategory][mode]; // km/h

  const distanceMeters = selected?.distance || 0;
  const distanceKm = distanceMeters / 1000;

  const duration =
    speed ? formatDuration(distanceKm / speed) : "--";

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

      <div className="grid grid-cols-12 gap-6">

        {/* ================= LEFT : MAP ================= */}
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-2xl overflow-hidden h-full shadow-xl border border-[#E2BBE9]">
            <MapContainer
              center={[26.8467, 80.9462]}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <MapClickHandler setStart={setStart} setEnd={setEnd} />
              <FitBounds routes={routes} />

              {start && (
                <Marker position={start}>
                  <Popup>Start</Popup>
                </Marker>
              )}

              {end && (
                <Marker position={end}>
                  <Popup>End</Popup>
                </Marker>
              )}

              {routes.map((route, index) => {
                if (selectedRoute !== null && selectedRoute !== index) return null;

                return (
                  <Polyline
                    key={index}
                    positions={route.geometry.coordinates.map((c) => [
                      c[1],
                      c[0],
                    ])}
                    color={ROUTE_STYLES[index].color}
                    dashArray={ROUTE_STYLES[index].dashArray}
                    weight={8}
                  />
                );
              })}
            </MapContainer>
          </div>
        </div>

        {/* ================= RIGHT : CONTROLS ================= */}
        <div className="col-span-12  lg:col-span-5 flex flex-col gap-5">

          {/* USER SETUP CARD */}
          <div className="bg-[#F4ECF7] border border-[#E2BBE9] rounded-2xl p-5 shadow-md">
            <h3 className="flex items-center gap-2 text-[#756AB6] font-semibold mb-4">
              <User size={18} />
              Personal Setup
            </h3>

            <div className="flex flex-wrap gap-3">
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="
                px-4 py-2 w-28 rounded-lg
                bg-white
                border border-[#E2BBE9]
                text-[#6B5FA7]
                focus:outline-none
                focus:ring-2 focus:ring-[#756AB6]
              "
              />

              <button
                onClick={() => setMode("jogging")}
                className={`
                px-4 py-2 rounded-lg flex items-center gap-2
                transition-all
                ${mode === "jogging"
                    ? "bg-[#756AB6] text-white shadow-md"
                    : "bg-white text-[#6B5FA7] hover:bg-[#E2BBE9]"
                  }
              `}
              >
                <Activity size={18} />
                Jogging
              </button>

              <button
                onClick={() => setMode("cycling")}
                className={`
                px-4 py-2 rounded-lg flex items-center gap-2
                transition-all
                ${mode === "cycling"
                    ? "bg-[#756AB6] text-white shadow-md"
                    : "bg-white text-[#6B5FA7] hover:bg-[#E2BBE9]"
                  }
              `}
              >
                <Bike size={18} />
                Cycling
              </button>
            </div>
          </div>

          {/* ACTIONS CARD */}
          <div className="bg-white border border-[#E2BBE9] rounded-2xl p-5 shadow-md">
            <h3 className="flex items-center gap-2 text-[#756AB6] font-semibold mb-4">
              <Route size={18} />
              Route Actions
            </h3>

            <div className="flex gap-3">
              {/* FIND ROUTES */}
              <button
                onClick={handleFindRoutes}
                disabled={loading}
                className="
      flex-1 h-11
      flex items-center justify-center gap-2
      rounded-lg
      bg-[#756AB6] text-white
      shadow-md
      hover:opacity-90
      disabled:opacity-60
    "
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Finding</span>
                  </>
                ) : (
                  <>
                    <Route size={18} />
                    <span>Find Routes</span>
                  </>
                )}
              </button>

              {/* RESET */}
              <button
                onClick={handleReset}
                className="
      flex-1 h-11
      flex items-center justify-center gap-2
      rounded-lg
      border border-[#E2BBE9]
      text-[#6B5FA7]
      hover:bg-[#F4ECF7]
    "
              >
                <RotateCcw size={18} />
                <span>Reset</span>
              </button>
            </div>


            {error && (
              <div className="text-sm text-red-500 mt-3">
                {error}
              </div>
            )}
          </div>

          {/* HEALTH RISK SCALE */}
          { (
            <div className="bg-[#F4ECF7] border border-[#E2BBE9] rounded-2xl p-4 shadow-md">
              <h3 className="flex items-center gap-2 text-[#756AB6] font-semibold mb-3">
                <Activity size={18} />
                Health Risk Preference
              </h3>

              <div className="flex flex-wrap gap-2">
                {ROUTE_STYLES.map((style, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedRoute(index)}
                    className={`
                    px-4 py-1.5 rounded-full text-sm font-medium
                    transition-all
                    ${selectedRoute === index
                        ? "text-white shadow-md"
                        : "text-[#6B5FA7] bg-white hover:bg-[#E2BBE9]"
                      }
                  `}
                    style={{
                      backgroundColor:
                        selectedRoute === index ? style.color : undefined,
                    }}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ROUTE INFO */}
          { (
            <div className="bg-white border border-[#E2BBE9] rounded-2xl p-5 shadow-md">
              <h3 className="flex items-center gap-2 text-[#756AB6] font-semibold mb-3">
                <Timer size={18} />
                Route Summary
              </h3>

              <div className="flex flex-row justify-between gap-2 text-sm text-[#6B5FA7]">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="capitalize">{ageCategory?ageCategory:"Not Selected"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Route size={16} />
                  {distanceMeters.toFixed(0)} meters
                </div>

                <div className="flex items-center gap-2">
                  <Timer size={16} />
                  {duration}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

}

export default MapComponent;
