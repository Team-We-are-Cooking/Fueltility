"use client";

import React from "react";
import SideBar from "@/components/sideBar/SideBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useUserStore } from "@/store/userStore";

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { userId } = useUserStore.getState();

	useEffect(() => {
		if (userId === "") {
			router.push("/sign-in");
		}
	}, [router, userId]);

	return (
		<div className="flex">
			<SideBar />
			<div className="flex-1">{children}</div>
		</div>
	);
}
