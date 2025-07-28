import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import { useAuthStore } from "../../zustand/useAuthStore.js";
import toast from "react-hot-toast";

const SignUp = () => {
	const [step, setStep] = useState(1);

	const { signup, isSigningUp, signupInputs, setSignupInputs } = useAuthStore();

	const handleCheckboxChange = (gender) => {
		setSignupInputs({ ...signupInputs, gender });
	};

	const validateStep1 = () => {
		if (!signupInputs.firstName.trim() || !signupInputs.lastName.trim() || !signupInputs.email.trim()) {
			toast.error("Please fill in all fields");
			return false;
		}
		if (!/\S+@\S+\.\S+/.test(signupInputs.email)) {
			toast.error("Invalid email format");
			return false;
		}
		return true;
	};

	const validateStep2 = () => {
		if (!signupInputs.username.trim() || !signupInputs.password || !signupInputs.confirmPassword) {
			toast.error("Please fill in all fields");
			return false;
		}
		if (signupInputs.password.length < 6) {
			toast.error("Password must be at least 6 characters");
			return false;
		}
		if (signupInputs.password !== signupInputs.confirmPassword) {
			toast.error("Passwords must match");
			return false;
		}
		return true;
	};

	const nextStep = () => {
		if (step === 1 && validateStep1()) {
			setStep(step + 1);
		} else if (step === 2 && validateStep2()) {
			setStep(step + 1);
		}
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!signupInputs.gender) {
			return toast.error("Please select a gender");
		}
		await signup(signupInputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-8 rounded-2xl shadow-lg bg-base-100 border-2 border-primary'>
				<h1 className='text-3xl font-semibold text-center'>
					<span className='text-primary'>YapBox</span> Sign Up
				</h1>

				<div className='flex justify-center my-6'>
					<ul className='steps w-full'>
						<li className={`step step-primary`} data-content={step > 1 ? "✓" : "1"}>
							Info
						</li>
						<li className={`step ${step >= 2 ? "step-primary" : ""}`} data-content={step > 2 ? "✓" : "2"}>
							Account
						</li>
						<li className={`step ${step >= 3 ? "step-primary" : ""}`} data-content={step > 3 ? "✓" : "3"}>
							Details
						</li>
					</ul>
				</div>

				<form onSubmit={handleSubmit}>
					{step === 1 && (
						<>
							<div>
								<label className='label p-2' htmlFor='firstName'>
									<span className='text-base label-text'>First Name</span>
								</label>
								<input
									type='text'
									id='firstName'
									placeholder='John'
									className='w-full input input-bordered h-10'
									value={signupInputs.firstName}
									onChange={(e) => setSignupInputs({ ...signupInputs, firstName: e.target.value })}
								/>
							</div>
							<div>
								<label className='label p-2' htmlFor='lastName'>
									<span className='text-base label-text'>Last Name</span>
								</label>
								<input
									type='text'
									id='lastName'
									placeholder='Doe'
									className='w-full input input-bordered h-10'
									value={signupInputs.lastName}
									onChange={(e) => setSignupInputs({ ...signupInputs, lastName: e.target.value })}
								/>
							</div>
							<div>
								<label className='label p-2' htmlFor='email'>
									<span className='text-base label-text'>Email</span>
								</label>
								<input
									type='text'
									id='email'
									placeholder='example@gmail.com'
									className='w-full input input-bordered h-10'
									value={signupInputs.email}
									onChange={(e) => setSignupInputs({ ...signupInputs, email: e.target.value })}
								/>
							</div>
						</>
					)}

					{step === 2 && (
						<>
							<div>
								<label className='label p-2' htmlFor='username'>
									<span className='text-base label-text'>Username</span>
								</label>
								<input
									type='text'
									id='username'
									placeholder='i_like_turtles'
									className='w-full input input-bordered h-10'
									value={signupInputs.username}
									onChange={(e) => setSignupInputs({ ...signupInputs, username: e.target.value })}
								/>
							</div>
							<div>
								<label className='label' htmlFor='password'>
									<span className='text-base label-text'>Password</span>
								</label>
								<input
									type='password'
									id='password'
									placeholder='Enter Password'
									className='w-full input input-bordered h-10'
									value={signupInputs.password}
									onChange={(e) => setSignupInputs({ ...signupInputs, password: e.target.value })}
								/>
							</div>
							<div>
								<label className='label' htmlFor='confirmPassword'>
									<span className='text-base label-text'>Confirm Password</span>
								</label>
								<input
									type='password'
									id='confirmPassword'
									placeholder='Confirm Password'
									className='w-full input input-bordered h-10'
									value={signupInputs.confirmPassword}
									onChange={(e) =>
										setSignupInputs({ ...signupInputs, confirmPassword: e.target.value })
									}
								/>
							</div>
						</>
					)}

					{step === 3 && (
						<div className='flex justify-center'>
							<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={signupInputs.gender} />
						</div>
					)}

					<div className='mt-6 flex justify-between items-center'>
						{step > 1 ? (
							<button type='button' className='btn btn-ghost btn-sm' onClick={prevStep}>
								Back
							</button>
						) : (
							<div />
						)}

						{step < 3 && (
							<button type='button' className='btn btn-primary btn-sm' onClick={nextStep}>
								Next
							</button>
						)}

						{step === 3 && (
							<button className='btn btn-primary btn-sm' disabled={isSigningUp}>
								{isSigningUp ? <span className='loading loading-spinner'></span> : "Sign Up"}
							</button>
						)}
					</div>
				</form>
			</div>

			<Link to={"/login"} className='text-sm hover:underline hover:text-primary mt-4 inline-block text-center w-full'>
				Already have an account?
			</Link>
		</div>
	);
};
export default SignUp;
