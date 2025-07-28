import React, { useEffect } from "react";
import { Palette, Calendar, Check } from "lucide-react";
import useThemeStore from "../../zustand/useThemeStore";
import { useAuthStore } from "../../zustand/useAuthStore";

// Define your custom themes and other curated themes separately
const yapboxThemes = ["yapbox-light", "yapbox-dark"];
const otherThemes = [ "cupcake", "bumblebee", "emerald", "corporate", "synthwave",
					  "retro", "cyberpunk", "valentine", "halloween", "garden",
					  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe",
					  "black", "luxury", "dracula", "cmyk", "autumn", "business",
					  "acid", "lemonade", "night", "coffee", "winter"];

const SettingsPage = () => {
	const { theme, setTheme, saveSettings, isSaving } = useThemeStore();
	const { authUser } = useAuthStore();

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const handleSave = () => {
		saveSettings({ theme });
	};

	const joinedDate = authUser?.createdAt
		? new Date(authUser.createdAt).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
		  })
		: "N/A";

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto py-10'>
			<div className='w-full max-w-4xl p-8 rounded-2xl shadow-lg bg-base-100 border-2 border-primary'>
				<h1 className='text-3xl font-semibold text-center mb-8'>Settings</h1>

				{/* Original Yapbox Themes */}
				<div className='mb-8'>
					<h2 className='text-xl font-semibold text-base-content mb-4 flex items-center'>
						<Palette className='mr-2' /> Original Yapbox Themes
					</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
						{yapboxThemes.map((themeName) => (
							<ThemePreview
								key={themeName}
								themeName={themeName}
								isSelected={theme === themeName}
								onClick={() => setTheme(themeName)}
							/>
						))}
					</div>
				</div>

				{/* Other Themes */}
				<div className='mb-8'>
					<h2 className='text-xl font-semibold text-base-content mb-4 flex items-center'>
						<Palette className='mr-2' /> Other Themes
					</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
						{otherThemes.map((themeName) => (
							<ThemePreview
								key={themeName}
								themeName={themeName}
								isSelected={theme === themeName}
								onClick={() => setTheme(themeName)}
							/>
						))}
					</div>
				</div>

				{/* Date Joined Section */}
				<div className='mb-8'>
					<h2 className='text-xl font-semibold text-base-content mb-4 flex items-center'>
						<Calendar className='mr-2' /> Account Details
					</h2>
					<div className='flex items-center justify-between p-4 border border-base-300 rounded-lg'>
						<span className='text-base-content'>Date Joined</span>
						<span className='text-base-content font-mono'>{joinedDate}</span>
					</div>
				</div>

				{/* Save Button */}
				<div className='mt-8'>
					<button onClick={handleSave} className='btn btn-primary btn-block' disabled={isSaving}>
						{isSaving ? <span className='loading loading-spinner'></span> : "Save Changes"}
					</button>
				</div>
			</div>
		</div>
	);
};

const ThemePreview = ({ themeName, isSelected, onClick }) => {
    return (
        <div
            className={`border-2 rounded-lg cursor-pointer transition-all ${
                isSelected ? "border-primary scale-105" : "border-base-300"
            }`}
            onClick={onClick}
            data-theme={themeName}
        >
            <div className='bg-base-100 p-4 rounded-t-lg flex justify-between items-center'>
                <span className='text-base-content font-bold capitalize'>{themeName.replace("yapbox-", "")}</span>
                <Check className={`transition-opacity ${isSelected ? "opacity-100" : "opacity-0"}`} size={20} />
            </div>
            <div className='bg-base-100 p-2 rounded-b-lg flex gap-1'>
                <div className='bg-primary w-1/4 h-8 rounded'></div>
                <div className='bg-secondary w-1/4 h-8 rounded'></div>
                <div className='bg-accent w-1/4 h-8 rounded'></div>
                <div className='bg-neutral w-1/4 h-8 rounded'></div>
            </div>
        </div>
    );
};

export default SettingsPage;
