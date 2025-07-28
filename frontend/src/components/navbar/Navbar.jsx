import { Link } from "react-router-dom";
import { useAuthStore } from "../../zustand/useAuthStore.js";
import { MessageSquare, MessagesSquare, Settings, User, LogOut } from "lucide-react";

const Navbar = () => {
	const { authUser, logout } = useAuthStore();

	return (
		<header className='bg-base-100 border-b-2 border-b-primary fixed w-full top-0 z-40'>
			<div className='container mx-auto px-4 h-16'>
				<div className='flex items-center justify-between h-full'>
					<div className='flex items-center gap-8'>
						<Link to='/' className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
							<div className='size-9 rounded-lg bg-primary/10 flex items-center justify-center'>
								<MessageSquare className='w-5 h-5 text-primary' />
							</div>
							<h1 className='text-2xl font-bold text-primary'>The YapBox</h1>
						</Link>
					</div>

					{authUser ? (
						<div className='flex items-center gap-4'>
							<Link to={"/"} className={"btn btn-ghost"}>
								<MessagesSquare className='w-5 h-5' />
								<span className='hidden sm:inline text-base'>Messages</span>
							</Link>
							<Link to={"/profile"} className={"btn btn-ghost gap-2"}>
								<User className='w-5 h-5' />
								<span className='hidden sm:inline text-base'>Profile</span>
							</Link>
							<Link to={"/settings"} className={"btn btn-ghost gap-2 transition-colors"}>
								<Settings className='w-5 h-5' />
								<span className='hidden sm:inline text-base'>Settings</span>
							</Link>
							<button className='btn btn-ghost flex gap-2 items-center' onClick={logout}>
								<LogOut className='size-5' />
								<span className='hidden sm:inline text-base'>Logout</span>
							</button>
						</div>
					) : (
						<div className='flex items-center gap-2'>
							<Link to={"/login"} className={"btn btn-primary"}>
								<span className='text-base'>Login</span>
							</Link>
							<Link to={"/signup"} className={"btn btn-ghost"}>
								<span className='text-base'>Sign Up</span>
							</Link>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
