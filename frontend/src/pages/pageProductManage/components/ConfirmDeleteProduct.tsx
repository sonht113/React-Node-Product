import React from 'react';
import { DeleteIcon } from '../../../assets';
import { Product } from '../../../models/Product';

interface ConfirmProps {
	product: Product | undefined;
}

const ConfirmDeleteProduct: React.FC<ConfirmProps> = ({ product }) => {
	return (
		<div className="confirm-delete py-10">
			<DeleteIcon className="mx-auto mb-10" />
			<p className="text-center">
				Bạn có chắc chắn muốn xoá sản phẩm{' '}
				<span className="text-red-500">{product?.name}</span>?
			</p>
			<p className="text-center">
				Sản phẩm sẽ bị <span className="text-red-500">xoá vĩnh viễn.</span>
			</p>
		</div>
	);
};

export default ConfirmDeleteProduct;
