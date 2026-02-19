import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
	const { pathname } = useLocation();
	const { isAuthenticated, logout } = useAuth();

	const navItem = (path, label) =>
		`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
     ${
			pathname === path
				? "bg-[#FFEFEF] text-[#756AB6] shadow-md"
				: "text-[#FFEFEF] hover:bg-[#E2BBE9]/40 hover:text-[#756AB6]"
		}`;

	return (
		<div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
			<nav
				className="
          flex items-center gap-2 px-3 py-2
          rounded-full
          backdrop-blur-xl
          bg-linear-to-r
          from-[#756AB6]/80
          via-[#9B86BD]/80
          to-[#756AB6]/80
          border border-white/20
          shadow-xl
        "
			>
				<Link to="/" className={navItem("/", "Home")}>
					Home
				</Link>

				<Link to="/map" className={navItem("/map", "Map")}>
					Map
				</Link>

				<Link to="/about" className={navItem("/about", "About")}>
					About
				</Link>
                <Link to="/docs" className={navItem("/docs", "Docs")}>
                    Docs
                </Link>
				{isAuthenticated ? (
					<Link to="/login" className={navItem("/login", "Logout")} onClick={logout}>
						Logout
					</Link>
				) : (
					<Link to="/login" className={navItem("/login", "Login")}>
						Login
					</Link>
				)}
			</nav>
		</div>
	);
}

export default Navbar;
