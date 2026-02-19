import React, { useState } from "react";
import Footer from "../components/Footer";

import { Play, Copy, Check, Server, Shield, Timer, Hash } from "lucide-react";

const BASE_URL = "http://localhost:4000";

function ApiTester() {
	const [method, setMethod] = useState("GET");
	const [endpoint, setEndpoint] = useState("/route?start=77.2090,28.6139&end=77.2300,28.6200");
	const [token, setToken] = useState("");
	const [body, setBody] = useState("");
	const [response, setResponse] = useState("");
	const [status, setStatus] = useState(null);
	const [time, setTime] = useState(null);
	const [loading, setLoading] = useState(false);
	const [copied, setCopied] = useState(false);

	const sendRequest = async () => {
		setLoading(true);

		const start = Date.now();

		try {
			const res = await fetch(BASE_URL + endpoint, {
				method,

				headers: {
					"Content-Type": "application/json",
					...(token && {
						Authorization: `Bearer ${token}`,
					}),
				},

				...(method !== "GET" &&
					body && {
						body,
					}),
			});

			const end = Date.now();

			setTime(end - start);
			setStatus(res.status);

			const data = await res.json();

			setResponse(JSON.stringify(data, null, 2));
		} catch (err) {
			setResponse("Error: " + err.message);
			setStatus("ERROR");
		}

		setLoading(false);
	};

	const copyResponse = async () => {
		await navigator.clipboard.writeText(response);

		setCopied(true);

		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<div
				className="
				min-h-screen
				bg-linear-to-b
				from-[#FFEFEF]
				via-[#756AB6]/40
				to-[#FFEFEF]
				pt-28
				px-6
				pb-8
			"
			>
				<div className="max-w-5xl mx-auto">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-4xl font-bold text-[#756AB6] mb-2">Live API Tester</h1>

						<p className="text-[#9B86BD]">
							Test backend APIs directly from your browser
						</p>
					</div>

					{/* Request Panel */}
					<div
						className="
						bg-white/60
						backdrop-blur-xl
						border border-[#E2BBE9]
						rounded-3xl
						shadow-xl
						p-6
						mb-6
					"
					>
						{/* Method + endpoint */}
						<div className="flex gap-3 mb-4">
							<select
								value={method}
								onChange={(e) => setMethod(e.target.value)}
								className="
									border border-[#E2BBE9]
									rounded-xl
									p-3
									bg-white
								"
							>
								<option>GET</option>
								<option>POST</option>
								<option>PUT</option>
								<option>DELETE</option>
							</select>

							<input
								value={endpoint}
								onChange={(e) => setEndpoint(e.target.value)}
								className="
									flex-1
									border border-[#E2BBE9]
									rounded-xl
									p-3
								"
								placeholder="/route"
							/>
						</div>

						{/* Token */}
						<div className="mb-4">
							<div className="flex items-center gap-2 mb-1 text-[#756AB6] font-semibold">
								<Shield size={16} />
								JWT Token (optional)
							</div>

							<input
								value={token}
								onChange={(e) => setToken(e.target.value)}
								className="
									w-full
									border border-[#E2BBE9]
									rounded-xl
									p-3
								"
								placeholder="Paste JWT token here"
							/>
						</div>

						{/* Body */}
						<div className="mb-4">
							<div className="font-semibold text-[#756AB6] mb-1">Request Body</div>

							<textarea
								value={body}
								onChange={(e) => setBody(e.target.value)}
								rows={6}
								className="
									w-full
									border border-[#E2BBE9]
									rounded-xl
									p-3
									font-mono
								"
								placeholder={`{
"type": "TRAFFIC",
"lat": 28.61,
"lon": 77.20
}`}
							/>
						</div>

						{/* Send button */}
						<button
							onClick={sendRequest}
							className="
								bg-[#756AB6]
								text-white
								px-6
								py-3
								rounded-xl
								flex items-center gap-2
								hover:bg-[#5E548E]
								transition
							"
						>
							<Play size={18} />

							{loading ? "Sending..." : "Send Request"}
						</button>
					</div>

					{/* Response panel */}
					{response && (
						<div
							className="
							bg-white/60
							backdrop-blur-xl
							border border-[#E2BBE9]
							rounded-3xl
							shadow-xl
							p-6
						"
						>
							{/* Status + time */}
							<div className="flex gap-4 mb-3 text-sm">
								<div className="flex items-center gap-1">
									<Hash size={16} />
									Status: {status}
								</div>

								<div className="flex items-center gap-1">
									<Timer size={16} />
									Time: {time} ms
								</div>
							</div>

							{/* Copy */}
							<div className="flex justify-between items-center mb-2">
								<div className="font-semibold text-[#756AB6]">Response</div>

								<button onClick={copyResponse}>
									{copied ? <Check size={18} /> : <Copy size={18} />}
								</button>
							</div>

							<pre
								className="
								bg-[#F8F5FF]
								border border-[#E2BBE9]
								p-4
								rounded-xl
								overflow-x-auto
								text-sm
							"
							>
								{response}
							</pre>
						</div>
					)}
				</div>
			</div>

			<Footer />
		</>
	);
}

export default ApiTester;
