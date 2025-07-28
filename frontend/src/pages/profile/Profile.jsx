import { useState, useRef } from "react";
import { useAuthStore } from "../../zustand/useAuthStore";

const ProfilePage = () => {
	const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
	const [inputs, setInputs] = useState({
		firstName: authUser.firstName,
		lastName: authUser.lastName,
		username: authUser.username,
		email: authUser.email,
	});
	const [profilePic, setProfilePic] = useState(authUser.profilePic);
	const fileRef = useRef(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfilePic(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await updateProfile({ ...inputs, profilePic });
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto py-10'>
			<div className='w-full max-w-md p-8 rounded-2xl shadow-lg bg-base-100 border-2 border-primary'>
				<h1 className='text-3xl font-semibold text-center mb-6'>Edit Profile</h1>
				<form onSubmit={handleSubmit}>
					<div className='flex justify-center mb-6'>
						<div className='avatar relative w-32 h-32'>
							<img src={profilePic} className='w-32 h-32 rounded-full object-cover' alt='Profile' />
							<button
								type='button'
								className='absolute bottom-0 right-0 btn btn-primary btn-circle btn-sm'
								onClick={() => fileRef.current.click()}
							>
								✏️
							</button>
							<input type='file' hidden ref={fileRef} onChange={handleImageChange} accept='image/*' />
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='label p-2'>
								<span className='text-base label-text'>First Name</span>
							</label>
							<input
								type='text'
								className='w-full input input-bordered h-10'
								value={inputs.firstName}
								onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })}
							/>
						</div>
						<div>
							<label className='label p-2'>
								<span className='text-base label-text'>Last Name</span>
							</label>
							<input
								type='text'
								className='w-full input input-bordered h-10'
								value={inputs.lastName}
								onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
							/>
						</div>
						<div>
							<label className='label p-2'>
								<span className='text-base label-text'>Username</span>
							</label>
							<input
								type='text'
								className='w-full input input-bordered h-10'
								value={inputs.username}
								onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
							/>
						</div>
						<div>
							<label className='label p-2'>
								<span className='text-base label-text'>Email</span>
							</label>
							<input
								type='email'
								className='w-full input input-bordered h-10'
								value={inputs.email}
								onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
							/>
						</div>
					</div>

					<div className='mt-6'>
						<button className='btn btn-primary btn-block btn-sm' disabled={isUpdatingProfile}>
							{isUpdatingProfile ? (
								<span className='loading loading-spinner'></span>
							) : (
								"Update Profile"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfilePage;
