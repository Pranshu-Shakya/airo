import React, { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Key, AlertTriangle, Route, Shield, Database, Copy, Check } from "lucide-react";

// Copyable code block component
const CodeBlock = ({ children }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(children);
		setCopied(true);
		setTimeout(() => setCopied(false), 3000);
	};

	return (
		<div className="relative">
			<button
				onClick={handleCopy}
				className="
					absolute right-3 top-3
					text-[#756AB6]
					hover:text-[#5E548E]
					transition
				"
			>
				{copied ? <Check size={18} /> : <Copy size={18} />}
			</button>

			<pre
				className="
					bg-[#F8F5FF]
					border border-[#E2BBE9]
					text-[#5E548E]
					p-4
					rounded-xl
					text-sm
					overflow-x-auto
				"
			>
				{children}
			</pre>
		</div>
	);
};

// Section container
const Section = ({ icon: Icon, title, children, onClick }) => (
	<div className="bg-white/60 backdrop-blur-xl border border-[#E2BBE9] rounded-3xl shadow-xl p-8 mb-8">
		<div className="flex items-center gap-3 mb-4 w-full justify-between">
			<div className="flex items-center gap-3 ">
				<Icon className="text-[#756AB6]" />
				<h2 className="text-2xl font-semibold text-[#756AB6]">{title}</h2>
			</div>
		</div>

		<div className="text-[#5E548E] space-y-4">{children}</div>
	</div>
);

// Endpoint component
const Endpoint = ({ method, path, auth, description, request, response, example }) => (
	<div className="border border-[#E2BBE9] rounded-xl p-5 bg-[#FFEFEF]/50 space-y-4">
		<div className="flex items-center gap-3 flex-wrap">
			<span className="px-3 py-1 rounded-lg bg-[#756AB6] text-white text-sm font-semibold">
				{method}
			</span>

			<span className="font-mono text-[#756AB6]">{path}</span>

			<span className="text-xs px-2 py-1 rounded bg-[#E2BBE9]">
				{auth ? "Auth Required" : "Public"}
			</span>
		</div>

		<p>{description}</p>

		{request && (
			<div>
				<div className="font-semibold mb-1">Request</div>
				<CodeBlock>{request}</CodeBlock>
			</div>
		)}

		{response && (
			<div>
				<div className="font-semibold mb-1">Response</div>
				<CodeBlock>{response}</CodeBlock>
			</div>
		)}

		{example && (
			<div>
				<div className="font-semibold mb-1">Example</div>
				<CodeBlock>{example}</CodeBlock>
			</div>
		)}
	</div>
);

function Docs() {
	const navigate = useNavigate();
	return (
		<>
			<div className="min-h-screen bg-linear-to-b from-[#FFEFEF] via-[#756AB6]/40 to-[#FFEFEF] px-6 pt-28 pb-8">
				<div className="max-w-5xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-[#756AB6] mb-4">
							API Documentation
						</h1>

						<p className="text-lg text-[#9B86BD]">
							Complete reference for Environmental Route Optimization Backend API
						</p>
					</div>
					{/* Base URL */}
					<Section icon={Database} title="Base URL">
						<CodeBlock>http://localhost:4000</CodeBlock>

						<div>
							• CORS enabled
							<br />
							• Token expiry: 7 days
							<br />• Authorization header format:
						</div>

						<CodeBlock>Authorization: Bearer &lt;jwt_token&gt;</CodeBlock>

						<div className="mt-4">
							<button
								onClick={() => navigate("/api-tester")}
								className="
				bg-[#756AB6]
				text-white
				px-4 py-2
				rounded-lg
				hover:bg-[#5E548E]
				transition
			"
							>
								Try API Tester
							</button>
						</div>
					</Section>
					;{/* Auth */}
					<Section icon={Key} title="Authentication">
						<Endpoint
							method="POST"
							path="/auth/signup"
							auth={false}
							description="Create new user account"
							request={`{
"name": "Alice",
"email": "alice@example.com",
"password": "password"
}`}
							response={`{
"token": "<jwt_token>"
}`}
							example={`curl -X POST http://localhost:4000/auth/signup
-H "Content-Type: application/json"
-d '{"name":"Alice","email":"alice@example.com","password":"password"}'`}
						/>

						<Endpoint
							method="POST"
							path="/auth/signin"
							auth={false}
							description="Login existing user"
							request={`{
"email": "alice@example.com",
"password": "password"
}`}
							response={`{
"token": "<jwt_token>"
}`}
							example={`curl -X POST http://localhost:4000/auth/signin
-H "Content-Type: application/json"
-d '{"email":"alice@example.com","password":"password"}'`}
						/>
					</Section>
					{/* Incident */}
					<Section icon={AlertTriangle} title="Incident API">
						<Endpoint
							method="POST"
							path="/incident/report"
							auth={true}
							description="Report environmental incident"
							request={`{
"type": "TRAFFIC",
"lat": 28.6139,
"lon": 77.2090,
"severity": 2
}`}
							response={`{
"_id": "...",
"type": "TRAFFIC",
"confidence": 0.3
}`}
							example={`curl -X POST http://localhost:4000/incident/report
-H "Authorization: Bearer <token>"
-H "Content-Type: application/json"
-d '{"type":"TRAFFIC","lat":28.6139,"lon":77.2090}'`}
						/>
					</Section>
					{/* Route */}
					<Section icon={Route} title="Route API">
						<Endpoint
							method="GET"
							path="/route"
							auth={false}
							description="Generate optimized routes"
							request={`Query:
start=lon,lat
end=lon,lat`}
							response={`[
{
"distance": 1200,
"duration": 900,
"healthScore": 42
}
]`}
							example={`curl "http://localhost:4000/route?start=77.2090,28.6139&end=77.2300,28.6200"`}
						/>
					</Section>
					{/* Notes */}
					<Section icon={Shield} title="Notes">
						<div>• Lower healthScore = healthier route</div>
						<div>• JWT required for incident APIs</div>
						<div>• Redis cache improves speed</div>
					</Section>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Docs;
