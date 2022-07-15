import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderActionApi: React.FC = (props) => (
	<ContentLoader
		className="fixed top-0 left-[50%] translate-x-[-50%] z-40 w-[100%] h-screen bg-gray-400 opacity-50"
		viewBox="0 0 400 160"
		height={160}
		width={400}
		backgroundColor="#00000"
		foregroundColor="#fafafa"
		{...props}
	>
		<circle cx="180" cy="50" r="2" />
		<circle cx="190" cy="50" r="2" />
		<circle cx="200" cy="50" r="2" />
	</ContentLoader>
);

export default LoaderActionApi;
