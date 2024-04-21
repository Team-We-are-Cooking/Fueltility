"use client";

import { useContext, useState } from "react";
import SideBar from "@/components/sideBar/SideBar";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { UserContext } from "@/components/providers/UserContext";

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const auth = useContext(UserContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (auth?.userId === "") {
			redirect("/sign-in");
		}

		setLoading(false);
	}, [router, auth?.userId]);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="flex">
			<SideBar />
			<div className="flex-1">{children}</div>
		</div>
	);
}
