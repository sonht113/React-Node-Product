import React from 'react';
import { Layout, Image, Typography } from 'antd';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { useUrl } from '../../hook/useUrl';
const { Header } = Layout;
const { Text } = Typography;

interface ItemHeader {
	key: number;
	title: string;
	url: string;
}

interface HeaderProps {
	items: ItemHeader[];
}

const HeaderFC: React.FC<HeaderProps> = (props) => {
	const { items } = props;
	const path = useUrl().location.pathname;

	return (
		<Header className="flex items-center bg-[#00ADE8]">
			<Link to="/product-show">
				<div className="flex items-center">
					<Image preview={false} src={logo} />
					<Text className="logo-text text-white !text-5xl font-bold">NCC</Text>
				</div>
			</Link>
			<div className="menu flex items-center gap-7 sm:ml-28 md:ml-36 lg:ml-48">
				{items.map((item: ItemHeader, index: number) => (
					<Link key={index} to={item.url}>
						<Text
							className={
								path === item.url || path.includes(item.url)
									? 'text-white font-medium text-lg cursor-pointer'
									: 'text-white font-medium opacity-60 text-lg hover:text-white hover:opacity-100 duration-100 cursor-pointer'
							}
						>
							{item.title}
						</Text>
					</Link>
				))}
			</div>
		</Header>
	);
};

export default HeaderFC;
