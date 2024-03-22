"use client";

import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { states } from "./state";
import { putProfile } from "../../../utils/fetchReq"

export default function Page() {
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formRef = e.currentTarget as HTMLFormElement;
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const firstName = formData.get("firstName") as string;
		const lastName = formData.get("lastName") as string;
		const address1 = formData.get("address1") as string;
		const address2 = formData.get("address2") as string;
		const city = formData.get("city") as string;
		const state = formData.get("state") as string;
		const zipcode = formData.get("zipcode") as string;

		if (!firstName || !lastName || !address1 || !city || !state || !zipcode) {
			toast.error("All fields are required");
			return;
		}

		const res = await putProfile("70916454-df22-4b07-882e-f0490a9ec619", formData, () => {})

		if (formRef) {
			formRef.reset();
		}
		
	} 

	async function validateName(e: React.ChangeEvent<HTMLInputElement>){
		e.preventDefault();
		const name = e.target.value;
		if (/\d/.test(name)) {
			toast.error("Name should only have non-numerical characters")
		}
	}

	async function validateZipcode(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		const name = e.target.value;
		if (!(/^\d+$/.test(name))) {
			toast.error("Name should only have numerical characters")
		}
	}

	async function validateCity(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		const name = e.target.value;
		if (/^\d+$/.test(name)) {
			toast.error("Name should only have non-numerical characters")
		}
	}

	return (
		<div className="text-neutral-200 p-12">
			<h1 className="text-3xl font-semibold text-neutral-100">Profile Management</h1>
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
											name="firstName"
											id="firstName"
											className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
											placeholder="John" 
											minLength={1}
											maxLength={50}
											onChange={validateName}
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
											name="lastName"
											id="lastName"
											className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
											placeholder="Doe" 
											minLength={1}
											maxLength={50}
											onChange={validateName}
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
										name="address1"
										id="address1"
										className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
										placeholder="1234 Richard Rd"
										minLength={1} 
										maxLength={100}
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
										name="address2"
										id="address2"
										className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
										placeholder="Apartment #1"
										minLength={1} 
										maxLength={100}
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
											className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
											placeholder="San Antonio"
											minLength={1} 
											maxLength={100}
											onChange={validateCity}
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
										className="block w-full h-10 rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors overflow-hidden" 
										required> 
											<option disabled selected hidden value="">Select</option>
											{Object.entries(states).map(([state, st]) => (
												<option key={state} value={state}>
													{st}
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
											name="zipcode"
											id="zipcode"
											className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-500 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
											placeholder="######"
											minLength={5} 
											maxLength={9}
											onChange={validateZipcode}
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
