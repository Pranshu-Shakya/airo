import React, { useState } from "react";
import {
  AlertTriangle,
  MapPin,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import { useAiroMap } from "../Hooks/useMap";

const INCIDENT_TYPES = [
  "FIRE",
  "CONSTRUCTION",
  "TRAFFIC",
  "INDUSTRIAL",
  "GARBAGE_BURNING",
  "ROAD_DUST",
];


// Severity mapping (UI → label)
const SEVERITY_LABELS = {
  1: "Low",
  3: "Moderate",
  5: "High",
};


function IncidentReport() {

  const [open, setOpen] = useState(false);

  const { reportIncident, loading, error } = useAiroMap();

  const [incidentType, setIncidentType] = useState("");

  const [coords, setCoords] = useState(null);

  const [severity, setSeverity] = useState(1);


  /* ===========================
     FETCH CURRENT LOCATION
  =========================== */
  const fetchLocation = () => {

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const newCoords = { lat, lon };

        console.log("📍 Coordinates fetched:", newCoords);

        setCoords(newCoords);

      },

      (err) => {

        console.error(err);
        alert("Please allow location access");

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
      }

    );

  };


  /* ===========================
     SUBMIT INCIDENT
  =========================== */
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!incidentType || !coords) {

      toast.error("Please select incident type and fetch location");

      return;

    }

    const incidentPayload = {

      type: incidentType,

      lat: coords.lat,

      lon: coords.lon,

      severity: severity * 20,

    };

    console.log("🚨 Sending payload:", incidentPayload);

    try {

      await reportIncident(incidentPayload);
        toast.success("Incident reported successfully!");
      setOpen(false);

      // reset form
      setIncidentType("");
      setCoords(null);
      setSeverity(1);

    }
    catch (err) {

      console.error(err);

      toast.error("Failed to report incident");

    }

  };


  return (

    <div className="w-full">


      {/* ===== TOGGLE BUTTON ===== */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="
          w-fit flex items-center gap-2
          px-4 py-3 rounded-xl
          bg-[#F4ECF7]
          border border-[#E2BBE9]
          text-[#756AB6]
          shadow-md hover:bg-[#EDE3F3]
        "
      >

        <AlertTriangle size={18} />

        <span className="font-medium">
          Report Incident
        </span>

        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}

      </button>


      {/* ===== FORM ===== */}
      {open && (

        <div className="
          mt-4
          bg-[#F4ECF7]
          border border-[#E2BBE9]
          rounded-2xl
          p-5
          shadow-md
        ">

          <form
            onSubmit={handleSubmit}
            className="
              flex flex-wrap gap-4 items-end w-full
            "
          >


            {/* INCIDENT TYPE */}
            <div className="flex-1 min-w-[180px]">

              <label className="
                text-sm text-[#6B5FA7] font-medium
              ">
                Incident Type
              </label>

              <select
                value={incidentType}
                onChange={(e) =>
                  setIncidentType(e.target.value)
                }
                className="
                  mt-1 w-full px-3 py-2
                  rounded-lg bg-white
                  border border-[#E2BBE9]
                  text-[#6B5FA7]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#756AB6]
                "
              >

                <option value="">
                  Select incident
                </option>

                {INCIDENT_TYPES.map(type => (

                  <option key={type} value={type}>
                    {type.replace("_", " ")}
                  </option>

                ))}

              </select>

            </div>


            {/* SEVERITY */}
            <div className="flex-1 min-w-[200px]">

              <label className="
                text-sm text-[#6B5FA7] font-medium
              ">

                Severity:{" "}

                <span className="
                  font-semibold text-[#756AB6]
                ">

                  {
                    SEVERITY_LABELS[
                      severity === 1
                        ? 1
                        : severity <= 3
                        ? 3
                        : 5
                    ]
                  }

                </span>

              </label>


              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={severity}
                onChange={(e) =>
                  setSeverity(Number(e.target.value))
                }
                className="
                  w-full mt-1 accent-[#756AB6]
                "
              />


              <div className="
                flex justify-between
                text-xs text-[#6B5FA7]
                mt-1
              ">
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
              </div>

            </div>


            {/* LOCATION BUTTON */}
            <button
              type="button"
              onClick={fetchLocation}
              className="
                min-w-[200px] h-[42px]
                flex items-center justify-center gap-2
                px-4 py-2
                rounded-lg
                bg-[#756AB6]
                text-white
                shadow-md hover:opacity-90
              "
            >

              <MapPin size={18} />

              Use Current Location

            </button>


            {/* SUBMIT */}
            <button
              type="submit"
              disabled={
                loading ||
                !incidentType ||
                !coords
              }
              className="
                min-w-[180px] h-[42px]
                flex items-center justify-center gap-2
                px-4 py-2 rounded-lg
                bg-[#756AB6]
                text-white
                shadow-md hover:opacity-90
                disabled:opacity-60
              "
            >

              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Reporting...
                </>
              ) : (
                "Report Incident"
              )}

            </button>


          </form>


          {/* LOCATION DISPLAY */}
          {coords?.lat && coords?.lon && (

            <p className="
              text-xs text-green-600 mt-3
            ">

              Location captured (
              {coords.lat.toFixed(4)},
              {" "}
              {coords.lon.toFixed(4)}
              )

            </p>

          )}


        </div>

      )}

    </div>

  );

}


export default IncidentReport;
