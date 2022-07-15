import { Modal } from 'antd';
import React from 'react';

import { DeleteIcon, SuccessIcon } from '../../../assets';

interface AlertProps {
	action: string;
	setIsShowAlert: any;
	isShowAlert: boolean;
}

const Alert: React.FC<AlertProps> = ({
	action,
	setIsShowAlert,
	isShowAlert,
}) => {
	return (
		<Modal
			footer={false}
			visible={isShowAlert}
			onCancel={() => setIsShowAlert(false)}
		>
			{action === 'add' && (
				<div className="alert text-center mx-auto py-10">
					<SuccessIcon className="mx-auto w-[90%] mb-10" />
					<span className="mt-10 text-xl font-semibold">Thêm thành công!</span>
				</div>
			)}
			{action === 'update' && (
				<div className="alert text-center mx-auto py-10">
					<SuccessIcon className="mx-auto w-[90%] mb-10" />
					<span className="mt-10 text-xl font-semibold">
						Chỉnh sửa thành công!
					</span>
				</div>
			)}
			{action === 'delete' && (
				<div className="alert text-center mx-auto py-10">
					<DeleteIcon className="mx-auto w-[90%] mb-10" />
					<span className="mt-10 text-xl font-semibold">
						Xoá sản phẩm thành công!
					</span>
				</div>
			)}
		</Modal>
	);
};

export default Alert;
