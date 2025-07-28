import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const useThemeStore = create((set, get) => ({
	theme: localStorage.getItem("yapbox-theme") || "yapbox-dark",
	isSaving: false,

	initTheme: () => {
		const { theme } = get();
		document.documentElement.setAttribute("data-theme", theme);
	},

	setTheme: (newTheme) => {
		set({ theme: newTheme });
		localStorage.setItem("yapbox-theme", newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
	},

	saveSettings: async (settings) => {
		set({ isSaving: true });
		try {
			await axiosInstance.put("/users/settings", { theme: settings.theme });
			get().setTheme(settings.theme);
			toast.success("Settings saved!");
		} catch (error) {
			toast.error("Failed to save settings.");
		} finally {
			set({ isSaving: false });
		}
	},
}));

export default useThemeStore;
