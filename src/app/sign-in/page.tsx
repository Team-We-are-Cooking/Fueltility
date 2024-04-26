"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useContext, useState } from "react";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import type { HTTPResponse } from "../../../types/http";
import type { AuthData, Credentials } from "../../../types/auth";
import { UserContext } from "@/components/providers/UserContext";

export default function Page() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const auth = useContext(UserContext);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const username = formData.get("username") as string;

		if (!email || !password || !username) {
			toast.error("All fields are required.");
			return;
		}

		const userCreds: Credentials = {
			email,
			password,
			username,
		};

		setIsLoading(true);

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userCreds),
			});

			if (!res.ok) {
				toast.error("Invalid credentials, please try again.");
				return;
			}

			const responseData: HTTPResponse<AuthData> = await res.json();
			const data = responseData.data;

			if (data.length === 0) {
				toast.error("Internal Server Error.");
				return;
			}

			auth?.setUserId(data[0]?.id);

			toast.success("Logged in successfully.");
			router.push("/fuel");
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="flex items-center justify-center py-32">
			<div className="w-full max-w-96">
				<div className="font-medium mb-8">
					<p className="text-xl mb-2">Welcome back</p>
					<p className="text-sm text-neutral-400">Sign in to your account</p>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="mt-4">
						<label
							htmlFor="username"
							className="block text-sm font-medium leading-6 text-neutral-400"
						>
							Username
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="text"
								name="username"
								id="username"
								className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="Username"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-neutral-400"
						>
							Email
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="email"
								name="email"
								id="email"
								className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="you@example.com"
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium leading-6 text-neutral-400"
						>
							Password
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<input
								type="password"
								name="password"
								id="password"
								className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
								placeholder="••••••••"
								required
							/>
						</div>
					</div>

					<button
						disabled={isLoading}
						className="w-full bg-mainButton mt-8 rounded-md border border-mainButtonBorder hover:bg-mainButtonHover py-2 transition-colors text-neutral-300 disabled:cursor-not-allowed"
					>
						Sign in
					</button>
				</form>

				<Link
					href="/sign-up"
					className="text-center mt-5 block text-sm text-neutral-400 hover:underline"
				>
					Need to create an account?
				</Link>
			</div>
		</div>
	);
}
