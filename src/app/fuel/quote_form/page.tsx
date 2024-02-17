"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";

export default function Page() {

	const [DeliveryDate, setDeliveryDate] = useState({
		startDate: null,
		endDate: null,
	});
	const router = useRouter();

	const handleDateChange = (newValue: any) => {
		setDeliveryDate(newValue);
	};

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formRef = e.currentTarget as HTMLFormElement;
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const gallonsRequested = formData.get("gallonsRequested") as string;
		if (!gallonsRequested || !DeliveryDate.startDate) {
			toast.error("All fields are required");
			return;
		}

		const date = new Date(DeliveryDate.startDate);
		const timestamp = Timestamp.fromDate(date);

		setDeliveryDate({ startDate: null, endDate: null });

		if (formRef) {
			formRef.reset();
		}
	}
    return (
		<div className="text-neutral-200 p-12">
		<h1 className="text-3xl font-semibold text-neutral-100">Fuel Quote Form</h1>
		<form onSubmit={handleSubmit}>
			<div className="space-y-12">
				<div className="">
					<div className="mt-10 flex flex-col gap-6">
						<div className="max-w-3xl">
							<label
								htmlFor="address"
								className="block text-sm font-medium leading-6 text-neutral-400"
							>
								Delivery Address
							</label>
							<div className="relative mt-2 rounded-md shadow-sm">
								<p
									id="address"
									className="block w-full rounded-md py-1.5 px-3 sm:text-sm sm:leading-6 transition-colors"
								>
									Your delivery address here
								</p>
							</div>
						</div>

						<div className="max-w-3xl">
							<label
								htmlFor="date"
								className="block text-sm font-medium leading-6 text-neutral-400"
							>
								Delivery Date
							</label>
							<div className="mt-2 max-w-3xl">
								<Datepicker
									inputClassName="bg-inputBG w-full max-w-3xl rounded-md py-1.5 px-3 border border-inputBorder placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors text-neutral-100"
									value={DeliveryDate}
									onChange={handleDateChange}
									popoverDirection="down"
								/>
							</div>
						</div>


						<div className="max-w-3xl">
							<label
								htmlFor="gallonsRequested"
								className="block text-sm font-medium leading-6 text-neutral-400"
							>
								Gallons Requested
							</label>
							<div className="relative mt-2 rounded-md shadow-sm">
								<input
									type="number"
									name="gallonsRequested" // this is used in formData.get("gallonsRequested")
									id="gallonsRequested"
									className="block w-1/4 rounded-md py-1.5 px-3 bg-inputBG border border-inputBorder   placeholder:text-gray-400 focus:ring-1 focus:outline-none focus:ring-inputHover sm:text-sm sm:leading-6 transition-colors"
									placeholder="0"
									min="0"
									required
								/>
							</div>
						</div>

						<div className="max-w-3xl">
							<label
								htmlFor="audience"
								className="block text-sm font-medium leading-6 text-neutral-400"
							>
								Suggested Price
							</label>
							<div className="relative mt-2 rounded-md shadow-sm">
								<p
									id="address"
									className="block w-full rounded-md py-1.5 px-3 sm:text-sm sm:leading-6 transition-colors"
								>
									99999 Robux
								</p>
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