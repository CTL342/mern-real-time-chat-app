import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-base-100 shadow-xl'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
