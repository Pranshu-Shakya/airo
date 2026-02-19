import React from "react";
import Footer from "../components/Footer";
import {
	Map,
	Navigation,
	Route,
	Wind,
	AlertTriangle,
	CheckCircle,
	Shield,
	Flame,
	Activity,
	Users,
	Zap,
} from "lucide-react";

function AboutPage() {
	return (
		<>
			<div
				className="
        min-h-screen
        bg-linear-to-b
        from-[#FFEFEF]
        via-[#756AB6]/40
        to-[#FFEFEF]
        px-6
        pt-28
        pb-1
      "
			>
				<div className="max-w-5xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12">
						<div className="flex justify-center mb-4 text-[#7566cb] bold ">
							<div className="flex flex-col">
								<div className="flex flex-row items-center">
									<Wind />
									<span
										className="
                                            text-3xl
                                            font-semibold
                                            tracking-wide
                                            font-['Dancing_Script',cursive]
                                          "
									>
										Airo
									</span>
								</div>
								<i className="text-sm font-semibold">A map that cares</i>
							</div>
						</div>

						<h1 className="text-4xl font-bold text-[#756AB6] mb-4">
							Your Intelligent Route Companion
						</h1>

						<p className="text-lg text-[#9B86BD] max-w-3xl mx-auto">
							An intelligent routing platform that helps users choose cleaner, safer,
							and healthier jogging and walking routes using real-time environmental
							intelligence and crowdsourced incident reporting.
						</p>
					</div>

					{/* Mission */}
					<div className="bg-white/60 backdrop-blur-xl border border-[#E2BBE9] rounded-3xl shadow-xl p-8 mb-8">
						<div className="flex items-center gap-3 mb-4">
							<h2 className="text-2xl font-semibold text-[#756AB6]">Our Mission</h2>
						</div>

						<p className="text-[#5E548E] leading-relaxed">
							Air pollution and environmental hazards directly impact public health,
							especially for runners and walkers. Our mission is to provide
							intelligent route recommendations that minimize pollution exposure
							using real-time AQI data, environmental scoring, and community reports.
						</p>
					</div>

					{/* How to Use the Map */}
					<div className="bg-white/60 backdrop-blur-xl border border-[#E2BBE9] rounded-3xl shadow-xl p-8 mb-8">
						<div className="flex items-center gap-3 mb-6">
							<h2 className="text-2xl font-semibold text-[#756AB6]">
								How to Use the Map
							</h2>
						</div>

						<div className="space-y-5 text-[#5E548E]">
							<div className="flex gap-4">
								<Navigation className="text-[#756AB6] mt-1" />
								<div>
									<h3 className="font-semibold">Select Start and Destination</h3>
									<p className="text-sm text-[#9B86BD]">
										Click on the map to choose your starting location and
										destination point.
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<Route className="text-[#756AB6] mt-1" />
								<div>
									<h3 className="font-semibold">Generate Intelligent Routes</h3>
									<p className="text-sm text-[#9B86BD]">
										The system generates multiple route options using advanced
										routing algorithms.
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<Wind className="text-[#756AB6] mt-1" />
								<div>
									<h3 className="font-semibold">Environmental Analysis</h3>
									<p className="text-sm text-[#9B86BD]">
										Each route is evaluated using AQI data, incidents, and
										environmental risk factors.
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<CheckCircle className="text-[#756AB6] mt-1" />
								<div>
									<h3 className="font-semibold">Choose the Cleanest Route</h3>
									<p className="text-sm text-[#9B86BD]">
										The safest and cleanest route is recommended automatically.
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<AlertTriangle className="text-[#756AB6] mt-1" />
								<div>
									<h3 className="font-semibold">
										Report Environmental Incidents
									</h3>
									<p className="text-sm text-[#9B86BD]">
										Help others by reporting pollution, fire, or hazardous
										areas.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* How It Works */}
					<div className="bg-white/60 backdrop-blur-xl border border-[#E2BBE9] rounded-3xl shadow-xl p-8 mb-8">
						<div className="flex items-center gap-3 mb-4">
							<h2 className="text-2xl font-semibold text-[#756AB6]">How It Works</h2>
						</div>

						<div className="space-y-4 text-[#5E548E]">
							<div className="flex gap-3">
								<Activity className="text-[#756AB6]" />
								<p>Routes are generated using OSRM routing engine.</p>
							</div>

							<div className="flex gap-3">
								<Wind className="text-[#756AB6]" />
								<p>Air Quality Index data is fetched in real-time.</p>
							</div>

							<div className="flex gap-3">
								<Flame className="text-[#756AB6]" />
								<p>User-reported incidents are analyzed.</p>
							</div>

							<div className="flex gap-3">
								<Shield className="text-[#756AB6]" />
								<p>Environmental scoring engine evaluates route safety.</p>
							</div>
						</div>
					</div>

					{/* Key Features */}
					<div className="bg-white/60 backdrop-blur-xl border border-[#E2BBE9] rounded-3xl shadow-xl p-8 mb-8">
						<div className="flex items-center gap-3 mb-4">
							<h2 className="text-2xl font-semibold text-[#756AB6]">Key Features</h2>
						</div>

						<div className="grid md:grid-cols-2 gap-4 text-[#5E548E]">
							<div className="flex gap-2">
								<Wind size={18} /> Real-time environmental routing
							</div>

							<div className="flex gap-2">
								<Users size={18} /> Crowdsourced incident reporting
							</div>

							<div className="flex gap-2">
								<Zap size={18} /> Redis-powered fast performance
							</div>

							<div className="flex gap-2">
								<Map size={18} /> Intelligent route optimization
							</div>

							<div className="flex gap-2">
								<Shield size={18} /> Trust-based safety scoring
							</div>

							<div className="flex gap-2">
								<Activity size={18} /> Scalable cloud-ready architecture
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default AboutPage;
