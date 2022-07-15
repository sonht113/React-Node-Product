import React from 'react';
interface buttonProps {
	title: string;
	background: string;
	onClick?: () => void;
}
const Button: React.FC<buttonProps> = (props) => {
	const { title, background, onClick } = props;

	return (
		<span
			onClick={onClick}
			className={`px-4 py-1 ${background} text-white rounded flex justify-center items-center hover:scale-110 duration-150`}
		>
			{title}
		</span>
	);
};

export default Button;
