import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { useUrl } from '../../hook/useUrl';

import Button from '../button/Button';
import { Product } from '../../models/Product';

interface queryDetail {
	category?: any;
	brand?: any;
}

interface showProductProps {
	setIsOpenConfirmDelete?: any;
	setProductDelete?: any;
	product?: Product;
	queryDetailPage?: queryDetail;
}

const { Meta } = Card;
const BoxProduct: React.FC<showProductProps> = (props) => {
	const { setIsOpenConfirmDelete, product, setProductDelete, queryDetailPage } =
		props;
	const url = useUrl().location.pathname;
	const navigate = useNavigate();

	return (
		<Card
			className="group lg:h-[259px] rounded-xl p-2"
			hoverable
			onClick={() => {
				if (url === '/product-show' || url.includes('/product-show/')) {
					navigate(
						`/product-show/product-detail/${product?._id}?category=${queryDetailPage?.category}&&brand=${queryDetailPage?.brand}`
					);
				}
			}}
			cover={
				<img
					alt="example"
					src={`${process.env.REACT_APP_URL_LOAD_IMG}${product?.avatarProduct}`}
					className="w-[100%] h-[146px] group-hover:scale-105 !rounded-lg object-cover duration-150"
				/>
			}
		>
			{url === '/product-show' || url.includes('/product-show') ? (
				<>
					<Meta
						title={product?.name}
						description={`$ ${product?.price.toLocaleString()}`}
					/>
				</>
			) : (
				<div className="2xl:w-[80%] 3xl:w-[50%] 4xl:w-[45%] 5xl:w-[35%] mx-auto">
					<Meta
						className="sm:text-left lg:text-left text-sm mb-4 mt-1"
						title={product?.name}
						description=""
					/>
					<div className="ListButton sm:flex md:flex-col lg:flex-row justify-around xl:justify-between sm:gap-x-0 md:gap-y-5 lg:gap-2 mt-2">
						<Button
							title={'Cập nhật'}
							onClick={() => {
								navigate(
									`/product-manage/update-product/${product?._id}?category=${queryDetailPage?.category}&&brand=${queryDetailPage?.brand}`
								);
							}}
							background={'bg-[#6ECB63]'}
						/>
						<Button
							onClick={() => {
								setProductDelete(product);
								setIsOpenConfirmDelete(true);
							}}
							title={'Xoá'}
							background={'bg-[#FF4D4D]'}
						/>
					</div>
				</div>
			)}
		</Card>
	);
};

export default BoxProduct;
