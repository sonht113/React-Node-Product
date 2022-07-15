import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import Lottie from 'lottie-react';
import notFound from '../../lottiefile/404.json';
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => {
	return (
		<div className="fixed top-0 left-0 flex flex-col bg-[#E5E5E5] w-[100%] h-screen z-30">
			<Lottie
				className="w-[60%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] duration-150"
				animationData={notFound}
				loop={true}
				autoplay={true}
			/>
			<div className="ml-10 mt-10 cursor-pointer">
				<Link to="/product-show" className="flex items-end">
					<AiFillHome className="text-5xl fill-[#5a9dfb]" />
					<span className="animate-bounce text-xl font-medium text-[#5a9dfb] bg-gray-500 py-2 px-3 rounded-xl hover:animate-none duration-100">
						👈Go Home Page
					</span>
				</Link>
			</div>
		</div>
	);
};

export default PageNotFound;
