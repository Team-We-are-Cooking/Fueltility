"use client";

import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { ToastContainer } from "react-toastify";
import UserProvider from "./UserContext";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<UserProvider>
			<Navbar />
			<div className="flex flex-col min-h-custom">
				<div className="flex-grow">{children}</div>
				<Footer />
			</div>

			<ToastContainer autoClose={3000} theme="dark" />
		</UserProvider>
	);
}
