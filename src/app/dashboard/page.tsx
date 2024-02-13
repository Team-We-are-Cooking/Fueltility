"use client";

import { useRouter } from "next/navigation";
import { ClockIcon } from "@heroicons/react/24/solid";

export default function Page() {
	return (
		<div className="p-12 flex items-center">
			<h1 className="text-secondaryText font-semibold text-4xl">
				Welcome Back, Let's Get to Practice.
			</h1>
		</div>
	);
}
