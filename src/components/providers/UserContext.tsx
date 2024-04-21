"use client";

import React, { createContext, useEffect, useState } from "react";

type UserState = {
	userId: string;
	setUserId: (id: string) => void;
	clearInfo: () => void;
};

export const UserContext = createContext<UserState | undefined>(undefined);

export default function UserProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [userId, setUserId] = useState<string>(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("fueltility-userId") || "";
		}
		return "";
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (userId) {
				localStorage.setItem("fueltility-userId", userId);
			} else {
				localStorage.removeItem("fueltility-userId");
			}
		}
	}, [userId]);

	const clearInfo = () => {
		setUserId("");
		if (typeof window !== "undefined") {
			localStorage.removeItem("fueltility-userId");
		}
	};

	return (
		<UserContext.Provider value={{ userId, setUserId, clearInfo }}>
			{children}
		</UserContext.Provider>
	);
}
