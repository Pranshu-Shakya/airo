import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/Landing";
import Navbar from "./components/Navbar";
import AuthPage from "./Pages/Login";
import AiroMap from "./Pages/AiroMap";
import About from "./Pages/About";
import Docs from "./Pages/Docs";
import ApiTester from "./Pages/ApiTester";
import { Toaster } from "sonner";
import ComingSoon from "./components/ComingSoon";

function App() {
	return (
		<>
			<BrowserRouter>
				<Toaster
					position="top-right"
					closeButton
					richColors={false}
					toastOptions={{
						style: {
							background: "#F8F5FF",
							border: "1px solid #E2BBE9",
							color: "#5E548E",
							borderRadius: "12px",
							fontSize: "14px",
						},

						className: "shadow-lg",
					}}
				/>
				<Navbar />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/map" element={<AiroMap/>}/>
					<Route path="/login" element={<AuthPage/>}/>
					<Route path="/map" element={<MapComponent />} />
					<Route path="/login" element={<AuthPage />} />
					<Route path="/about" element={<About />} />
					<Route path="/docs" element={<Docs />} />
					<Route path="/api-tester" element={<ApiTester />} />
                    <Route path="*" element={<ComingSoon />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
