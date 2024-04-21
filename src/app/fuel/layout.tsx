"use client";

import { useState } from "react";
import SideBar from "@/components/sideBar/SideBar";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useUserStore } from "@/store/userStore";

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { userId } = useUserStore.getState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (userId === "") {
			redirect("/sign-in");
		}

		setLoading(false);
	}, [router, userId]);

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
