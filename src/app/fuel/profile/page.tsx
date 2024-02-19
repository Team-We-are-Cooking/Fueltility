"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";

export default function Page() {
	const [eventDate, setEventDate] = useState({
		startDate: null,
		endDate: null,
	});
	const router = useRouter();

	const handleDateChange = (newValue: any) => {
		setEventDate(newValue);
	};

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formRef = e.currentTarget as HTMLFormElement;
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const title = formData.get("title") as string;
		const type = formData.get("type") as string;
		const company = formData.get("company") as string;
		const audience = formData.get("audience") as string;

		if (!type || !company || !audience || !eventDate.startDate || !title) {
			toast.error("All fields are required");
			return;
		}

		const date = new Date(eventDate.startDate);
		const timestamp = Timestamp.fromDate(date);

		setEventDate({ startDate: null, endDate: null });

		if (formRef) {
			formRef.reset();
		}
	}

	return (
		<div className="text-neutral-200 p-12">
			<h1 className="text-3xl font-semibold text-neutral-100">Profile Management</h1>
			<form onSubmit={handleSubmit}>
				<div className="space-y-12">
					<div className="">
						<div className="mt-10 flex flex-col gap-6">
							<div className="max-w-3xl">
								<label
									htmlFor="title"
									className="block text-sm font-medium leading-6 text-neutral-400"
								>
									Full Name
								</label>
								<div className="relative mt-2 rounded-md shadow-sm">
									<input
										type="text"
										name="title"
										id="title"
										className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
										placeholder="John Doe"
										required
									/>
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
										name="type"
										id="type"
										className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
										placeholder="1234 Richard Rd"
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
										name="type"
										id="type"
										className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
										placeholder="1234 Richard Rd"
										required
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
											name="company"
											id="company"
											className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
											placeholder="San Antonio"
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
										<input
											type="text"
											name="audience"
											id="audience"
											className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
											placeholder="Recruiter"
											required
										/>
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
											name="audience"
											id="audience"
											className="block w-full rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
											placeholder="Recruiter"
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
