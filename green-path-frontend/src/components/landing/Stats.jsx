import React from "react";
import { HeartPulse, Route, Wind } from "lucide-react";

const statsData = [
  {
    title: "Age-Specific Suggestions",
    desc: "Smart route recommendations tailored for different age groups and fitness levels.",
    icon: HeartPulse,
    image: "/age-health.jpg", // replace with your image
  },
  {
    title: "Health-Scored Paths",
    desc: "All available paths are rated with a clear health score to help you choose wisely.",
    icon: Route,
    image: "/path-score.jpg", // replace with your image
  },
  {
    title: "Real-Time AQI Optimisation",
    desc: "Live air quality data continuously updates and optimises routes for safer travel.",
    icon: Wind,
    image: "/aqi-live.jpg", // replace with your image
  },
];

function Stats() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {statsData.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="
                rounded-2xl overflow-hidden
                bg- bg-[#E2BBE9]/20
                border border-[#E2BBE9]
                text-[#FFEFEF]
                shadow-xl
                flex flex-col
              "
            >
              {/* Image */}
              <div className="h-68 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full rounded-t-2xl h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 text-center bg-white/10">
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-full bg-[#E2BBE9]/40">
                    <Icon className="text-[#756AB6]" size={22} />
                  </div>
                </div>

                <h3 className="text-lg text-[#756AB6] font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-[#756AB6] text-sm opacity-90">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;
