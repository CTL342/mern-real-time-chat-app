import { create } from "zustand";
import { axiosInstance } from "../../lib/axios.js";
import toast from "react-hot-toast";

const uploadImageToCloudinary = async (file) => {
    console.log("Cloudinary Cloud Name:", import.meta.env.VITE_CLOUDIN_NAME);
	console.log("Cloudinary Upload Preset:", import.meta.env.VITE_CLOUDIN_PRESET);
	

    const uploadPreset = import.meta.env.VITE_CLOUDIN_PRESET;
    const cloudName = import.meta.env.VITE_CLOUDIN_NAME;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
        return null;
    }
};

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    signupInputs: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    },

    setSignupInputs: (newInputs) => set({ signupInputs: newInputs }),
    
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get("/auth/check");
            if (res.data && res.data._id) {
                set({ authUser: res.data });
            } else {
                set({ authUser: null });
            }
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ 
                authUser: res.data,
                signupInputs: { firstName: "", lastName: "", email: "", username: "", password: "", confirmPassword: "", gender: "" }
            });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (username, password) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", { username, password });
            set({ 
                authUser: res.data,
                signupInputs: { firstName: "", lastName: "", email: "", username: "", password: "", confirmPassword: "", gender: "" }
            });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid username or password");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            let newProfilePic = data.profilePic;
            // Check if the profile picture is a new file to upload
            if (newProfilePic && newProfilePic.startsWith("data:")) {
                // Convert base64 to blob for uploading
                const res = await fetch(newProfilePic);
                const blob = await res.blob();
                const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
                const uploadedUrl = await uploadImageToCloudinary(file);
                if (uploadedUrl) {
                    newProfilePic = uploadedUrl;
                } else {
                    // Handle upload failure
                    throw new Error("Image upload failed.");
                }
            }

            const res = await axiosInstance.put("/users/update", { ...data, profilePic: newProfilePic });
            
            set({ authUser: res.data });
            localStorage.setItem("chat-user", JSON.stringify(res.data));
            toast.success("Profile updated successfully");

        } catch (error) {
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    }
}));