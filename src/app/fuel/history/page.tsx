"use client";

export default function Page() {
	const fuelQuoteHistory = [{
		gallonsRequested: 100,
		deliveryAddress: "1234 Main St, Houston, TX 77001 1234 Main St, Houston",
		deliveryDate: "01/01/2021",
		suggestedPrice: "$150.00"
	}, {
		gallonsRequested: 120,
		deliveryAddress: "1234 Main St, Houston, TX 77001",
		deliveryDate: "01/05/2021",
		suggestedPrice: "$200.00"
	}];
	
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
					{fuelQuoteHistory.map((quote, index) => (

					<tr className="border-b border-inputBorder">
						<td className="border-r border-inputBorder">{quote.gallonsRequested}</td>
						<td className="border-r border-inputBorder">{quote.deliveryAddress}</td>
						<td className="border-r border-inputBorder">{quote.deliveryDate}</td>
						<td className="border-r border-inputBorder">{quote.suggestedPrice}</td>
					</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}