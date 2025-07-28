import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./zustand/useAuthStore.js";
import useThemeStore from "./zustand/useThemeStore.js";
import FullPageLoader from "./components/loaders/FullPageLoader.jsx";

function App() {
	const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
	const { initTheme } = useThemeStore();

	useEffect(() => {
		checkAuth();
		initTheme();
	}, [checkAuth, initTheme]);

	if (isCheckingAuth) {
		return <FullPageLoader />;
	}

	return (
		<div>
			<Navbar />
			<div className='min-h-screen flex items-center justify-center px-4 pt-16'>
				<Routes>
					<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
					<Route path='/profile' element={authUser ? <Profile /> : <Navigate to={"/login"} />} />
					<Route path='/settings' element={authUser ? <Settings /> : <Navigate to={"/login"} />} />
					<Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to='/' />} />
					<Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
				</Routes>
				<Toaster />
			</div>
		</div>
	);
}

export default App;
