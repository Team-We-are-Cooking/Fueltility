"use client";

import Link from "next/link";
import {
	HomeIcon,
	NewspaperIcon,
	ClockIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function SideBar() {
	const pathname = usePathname();

	function isActiveLink(link: string, pathname: string, mainDirectory: string) {
		if (link === pathname && pathname === mainDirectory) {
			return true;
		} else if (pathname.includes(link) && link !== mainDirectory) {
			return true;
		} else {
			return false;
		}
	}

	const navLinks = [
		{
			href: "/fuel",
			icon: <HomeIcon className="h-6 w-6 mr-1" />,
			name: "Home",
		},
		{
			href: "/fuel/quote_form",
			icon: <NewspaperIcon className="h-6 w-6 mr-1" />,
			name: "Fuel Quote Form",
		},
		{
			href: "/fuel/history",
			icon: <ClockIcon className="h-6 w-6 mr-1" />,
			name: "Fuel Quote History",
		},
		{
			href: "/fuel/profile",
			icon: <UserIcon className="h-6 w-6 mr-1" />,
			name: "Profile Management",
		},
	];

	return (
		<div className="w-60 min-w-60 min-h-custom">
			<div className="pr-6 py-6 mt-16 fixed top-0 h-screen w-60 min-w-60 border-r border-r-border">
				<ul className="flex flex-col gap-3 transition-all text-sm">
					{navLinks.map((link, index) => {
						return (
							<li key={index}>
								<Link
									href={link.href}
									className={` ${
										isActiveLink(link.href, pathname, "/fuel")
											? "border-l-4 border-l-secondaryText text-white rounded-l-none"
											: "border-l-4 border-l-transparent text-gray-400"
									} flex gap-2 items-center hover:text-white pl-6 p-2 rounded-md`}
								>
									{link.icon}
									<p className="font-semibold text-sm">{link.name}</p>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
