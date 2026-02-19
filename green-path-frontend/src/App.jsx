import { useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/Landing";
import Navbar from "./components/Navbar";
import AuthPage from "./Pages/Login";
import About from "./Pages/About";
import Docs from "./Pages/Docs";
import ApiTester from "./Pages/ApiTester";


function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/map" element={<MapComponent/>}/>
					<Route path="/login" element={<AuthPage/>}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/docs" element={<Docs />}/>
                    <Route path="/api-tester" element={<ApiTester />}/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
