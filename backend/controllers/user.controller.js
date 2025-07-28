import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const updateUserProfile = async (req, res) => {
	const { firstName, lastName, username, email, profilePic } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		user.firstName = firstName || user.firstName;
		user.lastName = lastName || user.lastName;
		user.username = username || user.username;
		user.email = email || user.email;
		user.profilePic = profilePic || user.profilePic;

		await user.save();

		res.status(200).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			email: user.email,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.error("Error in updateUserProfile: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const updateThemeSettings = async (req, res) => {
	const { theme } = req.body;
	const userId = req.user._id;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		user.theme = theme || user.theme;

		await user.save();

		res.status(200).json({
			message: "Settings updated successfully",
			theme: user.theme,
		});
	} catch (error) {
		console.error("Error in updateThemeSettings: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};