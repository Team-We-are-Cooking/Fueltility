"use client";

import { getFuelQuote } from "@/utils/fetchReq";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Page() {
	const [data, setData] = useState<any>([]);
	const [loading, isLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch(
				"http://localhost:3001/api/fuel_quote?quote_id=&user_id=30ec44fe-a580-40cd-b53f-6f761f5c7165"
			);
			const jsonData = await response.json();
			console.log(jsonData);
			setData(jsonData.data);
			isLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	console.log(data);

	return (
		<div className="text-neutral-200 p-12">
			{loading ? (
				<Loading />
			) : (
				<>
					<h1 className="text-3xl font-semibold text-neutral-100 pb-16">
						Fuel Quote History
					</h1>

					<table className="text-neutral-400 text-sm font-medium leading-6 w-full border border-inputBorder">
						<thead className="bg-[#2E2E2E]">
							<tr>
								<th className="border-r border-inputBorder">
									Gallons Requested
								</th>
								<th className="border-r border-inputBorder">
									Delivery Address
								</th>
								<th className="border-r border-inputBorder">Delivery Date</th>
								<th className="border-r border-inputBorder">Suggested Price</th>
							</tr>
						</thead>
						<tbody className="text-center">
							{data.map((quote: any, index: number) => (
								<tr key={index} className="border-b border-inputBorder">
									<td className="border-r border-inputBorder">
										{quote.gallons_requested}
									</td>
									<td className="border-r border-inputBorder">
										{quote.delivery_address}
									</td>
									<td className="border-r border-inputBorder">
										{quote.delivery_date}
									</td>
									<td className="border-r border-inputBorder">
										{quote.suggested_price}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
		</div>
	);
}
