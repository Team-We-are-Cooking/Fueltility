import { create } from "zustand";

type userStore = {
	userId: string;
	setUserId: (id: string) => void;
	clearInfo: () => void;
};

export const useUserStore = create<userStore>((set) => ({
	userId: "",
	setUserId: (id: string) => set({ userId: id }),
	clearInfo: () =>
		set({
			userId: "",
		}),
}));

const { clearInfo, setUserId, userId } = useUserStore.getState();
const userLoggedIn = userId === "" ? "Login" : "Logout";
