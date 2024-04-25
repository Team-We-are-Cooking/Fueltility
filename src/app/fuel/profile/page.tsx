"use client";

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { states } from "./states";
import { UserContext } from "@/components/providers/UserContext";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

type ProfileForm = {
	first_name: string;
	last_name: string;
	address: string;
	address_two: string;
	city: string;
	state: string;
	zip_code: string;
};

type ErrorHTTP = {
	success: boolean;
	error: ErrorMessage;
};

type ErrorMessage = {
	message: string;
};

export default function Page() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [profileData, setProfileData] = useState<ProfileForm>({
		first_name: "",
		last_name: "",
		address: "",
		address_two: "",
		city: "",
		state: "",
		zip_code: "",
	});

	const auth = useContext(UserContext);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/profile?quote_id=&user_id=${auth?.userId}`
			);

			if (!response.ok) {
				toast.error("Error fetching data");
				return;
			}

			const jsonData = await response.json();
			const data: ProfileForm = jsonData.data[0];

			setProfileData({
				first_name: data.first_name ? data.first_name : "",
				last_name: data.last_name ? data.last_name : "",
				address: data.address ? data.address : "",
				address_two: data.address_two ? data.address_two : "",
				city: data.city ? data.city : "",
				state: data.state ? data.state : "",
				zip_code: data.zip_code ? data.zip_code : "",
			});
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const firstName = profileData.first_name;
		const lastName = profileData.last_name;
		const address1 = profileData.address;
		const address2 = profileData.address_two;
		const city = profileData.city;
		const state = profileData.state;
		const zipcode = profileData.zip_code;

		if (!firstName || !lastName || !address1 || !city || !state || !zipcode) {
			toast.error("All fields are required");
			return;
		}

		if (validateName(firstName)) {
			toast.error("First name should only have non-numerical characters");
			return;
		}

		if (validateName(lastName)) {
			toast.error("Last name should only have non-numerical characters");
			return;
		}

		if (validateCity(city)) {
			toast.error("City should only have non-numerical characters");
			return;
		}

		if (validateZipcode(zipcode)) {
			toast.error("Zipcode should only have numerical characters");
			return;
		}

		const formData = {
			first_name: firstName,
			last_name: lastName,
			address: address1,
			address_two: address2,
			city: city,
			state: state,
			zip_code: zipcode,
		};

		setIsLoading(true);

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/profile?user_id=${auth?.userId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (!res.ok) {
				const resData: ErrorHTTP = await res.json();
				const errorMessage = resData.error.message;

				toast.error(`Error updating profile: ${errorMessage}`);
				return;
			}

			toast.success("Information Updated");
		} catch (error) {
			console.error("Error updating information:", error);
		} finally {
			setIsLoading(false);
		}
	}

	function handleChange(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) {
		const { name, value } = e.target;
		setProfileData((prev) => ({ ...prev, [name]: value }));
	}

	function validateName(name: string) {
		return /\d/.test(name);
	}

	function validateZipcode(zipcode: string) {
		return !/^\d+$/.test(zipcode);
	}

	function validateCity(city: string) {
		return /^\d+$/.test(city);
	}

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="text-neutral-200 p-12">
			<h1 className="text-3xl font-semibold text-neutral-100">
				Profile Management
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="space-y-12">
					<div className="">
						<div className="mt-10 flex flex-col gap-6">
							<div className="flex max-w-3xl justify-between">
								<div className="w-full">
									<label
										htmlFor="title"
										className="block text-sm font-medium leading-6 text-neutral-400"
									>
										First Name
									</label>
									<div className="relative mt-2 rounded-md shadow-sm">
										<input
											type="text"
											name="first_name"
											id="first_name"
											value={profileData.first_name}
											className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
											placeholder="John"
											minLength={1}
											maxLength={50}
											onChange={handleChange}
											required
										/>
									</div>
								</div>

								<div className="ml-6 w-full">
									<label
										htmlFor="title"
										className="block text-sm font-medium leading-6 text-neutral-400"
									>
										Last Name
									</label>
									<div className="relative mt-2 rounded-md shadow-sm">
										<input
											type="text"
											name="last_name"
											id="last_name"
											value={profileData.last_name}
											className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
											placeholder="Doe"
											minLength={1}
											maxLength={50}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
							</div>

							<div className="max-w-3xl">
								<label
									htmlFor="date"
									className="block text-sm font-medium leading-6 text-neutral-400"
								>
									Address 1
								</label>
								<div className="relative mt-2 rounded-md shadow-sm">
									<input
										type="text"
										name="address"
										id="address"
										value={profileData.address}
										className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
										placeholder="1234 Richard Rd"
										minLength={1}
										maxLength={100}
										onChange={handleChange}
										required
									/>
								</div>
							</div>

							<div className="max-w-3xl">
								<label
									htmlFor="type"
									className="block text-sm font-medium leading-6 text-neutral-400"
								>
									Address 2
								</label>
								<div className="relative mt-2 rounded-md shadow-sm">
									<input
										type="text"
										name="address_two"
										id="address_two"
										value={profileData.address_two}
										className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
										placeholder="Apartment #1"
										minLength={1}
										maxLength={100}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="flex max-w-3xl justify-between">
								<div className="w-80">
									<label
										htmlFor="company"
										className="block text-sm font-medium leading-6 text-neutral-400"
									>
										City
									</label>
									<div className="relative mt-2 rounded-md shadow-sm">
										<input
											type="text"
											name="city"
											id="city"
											value={profileData.city}
											className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
											placeholder="San Antonio"
											minLength={1}
											maxLength={100}
											onChange={handleChange}
											required
										/>
									</div>
								</div>

								<div className="w-48">
									<label
										htmlFor="audience"
										className="block text-sm font-medium leading-6 text-neutral-400"
									>
										State
									</label>
									<div className="relative mt-2 rounded-md shadow-sm">
										<select
											name="state"
											id="state"
											value={profileData.state}
											onChange={handleChange}
											className="block w-full h-10 rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors overflow-hidden"
											required
										>
											{Object.entries(states).map(([state, abbrev]) => (
												<option key={state} value={state}>
													{abbrev}
												</option>
											))}
										</select>
									</div>
								</div>

								<div className="max-w-3xl">
									<label
										htmlFor="audience"
										className="block text-sm font-medium leading-6 text-neutral-400"
									>
										ZIP Code
									</label>
									<div className="relative mt-2 rounded-md shadow-sm">
										<input
											type="text"
											name="zip_code"
											id="zip_code"
											value={profileData.zip_code}
											className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
											placeholder="######"
											minLength={5}
											maxLength={9}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-8 flex items-center justify-end max-w-3xl">
					<button
						type="submit"
						className="py-2 px-4 flex rounded-md no-underline bg-mainButton hover:bg-mainButtonHover text-sm font-medium"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}
