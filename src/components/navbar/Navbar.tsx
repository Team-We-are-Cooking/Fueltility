"use client";

import Link from "next/link";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function Navbar() {
	const router = useRouter();
	const { userId, clearInfo } = useUserStore.getState();
	const [isClient, setIsClient] = useState(false);

	function handleSignOut() {
		clearInfo();
		router.push("/");
	}

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<nav className="w-full justify-between items-center h-16 sticky top-0 text-white bg-main border-b border-b-border z-10 px-6">
			<div className="flex h-16 justify-between items-center gap-6">
				<Link href={"/"} className="flex items-center gap-2">
					<FunnelIcon className="h-7 w-7 fill-secondaryText" />
					<p className="font-bold">Fueltility</p>
				</Link>

				{isClient && userId !== "" ? (
					<button
						onClick={handleSignOut}
						className="py-2 px-4 flex rounded-md no-underline bg-mainButton hover:bg-mainButtonHover text-xs font-medium"
					>
						Sign out
					</button>
				) : (
					<Link
						href={"/sign-in"}
						className="py-2 px-4 flex rounded-md no-underline bg-mainButton hover:bg-mainButtonHover text-xs font-medium"
					>
						Sign in
					</Link>
				)}
			</div>
		</nav>
	);
}
