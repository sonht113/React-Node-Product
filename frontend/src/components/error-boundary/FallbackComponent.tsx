import Lottie from 'lottie-react';
import Error from '../../lottiefile/error.json';

function ErrorFallback() {
	return (
		<div role="alert">
			<div className="w-full">
				<Lottie
					className="w-[30%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] duration-150"
					animationData={Error}
					loop={true}
					autoplay={true}
				/>
			</div>
			<div className="text-center mt-10">
				<p className="text-red-500 text-2xl font-medium">
					Something went wrong 😥
				</p>
				<button
					onClick={() => {
						window.location.reload();
					}}
					className="mt-3 py-2 px-5 bg-cyan-500 text-white font-medium rounded-lg hover:scale-105 duration-100"
				>
					Try again
				</button>
			</div>
		</div>
	);
}

export default ErrorFallback;
