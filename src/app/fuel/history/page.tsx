"use client";

import { getFuelQuote } from "@/utils/fetchReq";
import { useEffect, useState } from "react";

export default async function Page() {

	// const fuelQuoteHistory = [{
	// 	gallonsRequested: 100,
	// 	deliveryAddress: "1234 Main St, Houston, TX 77001 1234 Main St, Houston",
	// 	deliveryDate: "01/01/2021",
	// 	suggestedPrice: "$150.00"
	// }, {
	// 	gallonsRequested: 120,
	// 	deliveryAddress: "1234 Main St, Houston, TX 77001",
	// 	deliveryDate: "01/05/2021",
	// 	suggestedPrice: "$200.00"
	// }];

		const [data, setData] = useState<any>([]);
	  
		useEffect(() => {
		  fetchData();
		}, []);
	  
		const fetchData = async () => {
		  try {
			const response = await fetch('http://localhost:3001/api/fuel_quote?quote_id=&user_id=2d8d4210-0309-4940-9229-05a7a67a5d17');
			const jsonData = await response.json();
			setData(jsonData);
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		}
		console.log(data)

	// const fuelQuoteHistory = await getFuelQuote("2d8d4210-0309-4940-9229-05a7a67a5d17", () => {});
	// console.log(fuelQuoteHistory)
	
	return (
		<div className="text-neutral-200 p-12">
			<h1 className="text-3xl font-semibold text-neutral-100 pb-16">Fuel Quote History</h1>

			<table className="text-neutral-400 text-sm font-medium leading-6 w-full border border-inputBorder">
				<thead className="bg-[#2E2E2E]">
					<tr>
						<th className="border-r border-inputBorder">Gallons Requested</th>
						<th className="border-r border-inputBorder">Delivery Address</th>
						<th className="border-r border-inputBorder">Delivery Date</th>
						<th className="border-r border-inputBorder">Suggested Price</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{data.data.map((quote:any, index:number) => (

					<tr className="border-b border-inputBorder">
						<td className="border-r border-inputBorder">{quote.gallons_requested}</td>
						<td className="border-r border-inputBorder">{quote.delivery_address}</td>
						<td className="border-r border-inputBorder">{quote.delivery_date}</td>
						<td className="border-r border-inputBorder">{quote.suggested_price}</td>
					</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}