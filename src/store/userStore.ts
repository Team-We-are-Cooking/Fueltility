import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
	userId: string;
	setUserId: (id: string) => void;
	clearInfo: () => void;
};

export const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			userId: "",
			setUserId: (id: string) => set({ userId: id }),
			clearInfo: () =>
				set({
					userId: "",
				}),
		}),
		{
			name: "fueltility-storage",
		}
	)
);
