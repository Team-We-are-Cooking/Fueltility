import { toast } from "react-toastify";

export async function postLogin(
	data: FormData,
	setIsLoading: (value: boolean) => void
) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: data.get("email"),
				password: data.get("password"),
				username: data.get("username"),
			}),
		});

		return await res.json();
	} catch (error) {
		setIsLoading(false);
		toast.error("Error transcribing file");
	}
}

export async function postRegister(
	data: FormData,
	setIsLoading: (value: boolean) => void
) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: data.get("email"),
				password: data.get("password"),
				username: data.get("username"),
			}),
		});

		return await res.json();
	} catch (error) {
		setIsLoading(false);
		toast.error("Error transcribing file");
	}
}

export async function postFuelQuote(
	id: String,
	data: FormData,
	setIsLoading: (value: boolean) => void
) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fuel_quote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				gallons_requested: data.get("gallonsRequested"),
				delivery_date: data.get("deliveryDate"),
				delivery_address: data.get("deliveryAddress"),
			}),
		});

		return await res.json();
	} catch (error) {
		setIsLoading(false);
	}
}

export async function getFuelQuote(
	user_id: String,
	setIsLoading: (value: boolean) => void,
	quote_id?: String
) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/fuel_quote?quote_id=${quote_id}&user_id=${user_id}`
		);
		return await res.json();
	} catch (error) {
		setIsLoading(false);
		toast.error("Error transcribing file");
	}
}

export async function getProfile(
	user_id: String,
	setIsLoading: (value: boolean) => void
) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/profile?user_id=${user_id}`,
			{
				method: "GET",
			}
		);

		return await res.json();
	} catch (error) {
		setIsLoading(false);
		toast.error("Error transcribing file");
	}
}

export async function putProfile(
	user_id: String,
	data: FormData,
	setIsLoading: (value: boolean) => void
) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/profile?user_id=${user_id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					first_name: data.get("firstName"),
					last_name: data.get("lastName"),
					address: data.get("address1"),
					address_two: data.get("address2"),
					city: data.get("city"),
					state: data.get("state"),
					zip_code: data.get("zipcode"),
				}),
			}
		);

		return await res.json();
	} catch (error) {
		setIsLoading(false);
		toast.error("Error transcribing file");
	}
}
