import React from 'react';
import { Product } from '../../../models/Product';

interface InfoProductProps {
	product?: Product;
}
const InfoProduct: React.FC<InfoProductProps> = ({ product }) => {
	return (
		<>
			<div className="NameProduct mb-5">
				<span className="font-semibold text-xl">{product?.name}</span>
			</div>
			<div className="leading-8 mb-5">
				<p className="font-medium">
					Danh Mục:{' '}
					<span className="font-normal">
						{product?.category === 'car'
							? 'Ô tô'
							: product?.category === 'bicycle'
							? 'Xe đạp'
							: 'Xe máy'}
					</span>
				</p>
				<p className="font-medium">
					Hãng Sản Xuất: <span className="font-normal">{product?.brand}</span>
				</p>
				<p className="font-medium">
					Giá Sản Phẩm: <span className="font-normal">$ </span>
					<span className="font-normal">{product?.price.toLocaleString()}</span>
				</p>
			</div>
			<div className="Description">
				<p className="font-medium">Mô Tả Sản Phẩm:</p>
				<p className="product-detail__description">{product?.description}</p>
			</div>
		</>
	);
};

export default InfoProduct;
