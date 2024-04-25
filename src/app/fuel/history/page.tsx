"use client";

import { getFuelQuote } from "@/utils/fetchReq";
import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { UserContext } from "@/components/providers/UserContext";
import { toast } from "react-toastify";

type FuelQuoteData = {
	gallons_requested: number;
	delivery_address: string;
	delivery_date: string;
	suggested_price: number;
};

export default function Page() {
	const [data, setData] = useState<FuelQuoteData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const auth = useContext(UserContext);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/fuel_quote?quote_id=&user_id=${auth?.userId}`
			);

			if (!response.ok) {
				toast.error("Error fetching data");
				return;
			}

			const resData = await response.json();
			const data: FuelQuoteData[] = resData.data;
			setData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="text-neutral-200 p-12">
			<h1 className="text-3xl font-semibold text-neutral-100 pb-16">
				Fuel Quote History
			</h1>

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
		</div>
	);
}
