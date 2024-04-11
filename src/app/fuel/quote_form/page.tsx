"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Datepicker from "react-tailwindcss-datepicker";

export default function Page() {

	const [deliveryDate, setDeliveryDate] = useState({
		startDate: null,
		endDate: null
	});

	const [address, setData] = useState<any>([]);
	  
		useEffect(() => {
		  fetchData();
		}, []);
	  
		const fetchData = async () => {
		  try {
			const response = await fetch('http://localhost:3001/api/profile?user_id=70916454-df22-4b07-882e-f0490a9ec619');
			const jsonData = await response.json();	
			const addy = `${jsonData.data[0].address} ${jsonData.data[0].address_two} ${jsonData.data[0].city} ${jsonData.data[0].city}, ${jsonData.data[0].state}`
			setData(addy)

		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		}

	const handleDateChange = (newValue: any) => {
		setDeliveryDate(newValue);
	};

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formRef = e.currentTarget as HTMLFormElement;
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const gallonsRequested = parseInt(formData.get("gallons_requested") as string) as number;
		const dateRequested = deliveryDate.startDate
		if (!gallonsRequested || !dateRequested || !address) {
			toast.error("All fields are required");
			return
		}

		formData.set("delivery_date", dateRequested)

		await fetch(`http://localhost:3001/api/fuel_quote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"user_id": "30ec44fe-a580-40cd-b53f-6f761f5c7165",
    			"gallons_requested": gallonsRequested, 
    			"delivery_address": address,
    			"delivery_date": dateRequested
			})
		});

		if (formRef) {
			toast.success("Form Created")
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
								htmlFor="date"
								className="block text-sm font-medium leading-6 text-neutral-400"
							>
								Delivery Address
							</label>
							<div className="mt-2 max-w-3xl">
								{address}
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
									value={deliveryDate}
									onChange={handleDateChange}
									popoverDirection="down"
									asSingle={true}
								/>
							</div>
						</div>


						<div className="max-w-3xl">
							<label
								htmlFor="gallons_requested"
								className="block text-sm font-medium leading-6 text-neutral-400"
							>
								Gallons Requested
							</label>
							<div className="relative mt-2 rounded-md shadow-sm">
								<input
									type="number"
									name="gallons_requested"
									id="gallons_requested"
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