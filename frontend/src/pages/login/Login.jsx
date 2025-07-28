import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../zustand/useAuthStore.js";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoggingIn } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-8 rounded-2xl shadow-lg bg-base-100 border-2 border-primary'>
				<h1 className='text-3xl font-semibold text-center'>
					<span className='text-primary'>YapBox </span> Login
				</h1>

				<form onSubmit={handleSubmit} className='mt-6'>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className='mt-2'>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className='mt-6'>
						<button className='btn btn-primary btn-block btn-sm' disabled={isLoggingIn}>
							{isLoggingIn ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
					</div>
				</form>
			</div>

			<Link to='/signup' className='text-sm hover:underline hover:text-primary mt-4 inline-block'>
				{"Don't"} have an account?
			</Link>
		</div>
	);
};
export default Login;
