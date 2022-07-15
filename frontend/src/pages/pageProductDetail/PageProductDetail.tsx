import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

import InfoProduct from './components/InfoProduct';
import SlideImage from './components/SlideImage';
import BoxProduct from '../../components/box-product/BoxProduct';
import productApi from '../../api/productApi';
import { Product } from '../../models/Product';
import useLoading from '../../hook/useLoading';

interface detailProps {}

const PageProductDetail: React.FC<detailProps> = (props) => {
	const [productDetail, setProductDetail] = useState<Product>();
	const [slidePicProduct, setSlidePicProduct] = useState<string[]>([]);
	const [productSuggestion, setProductSuggestion] = useState<Product[]>();
	const params = useParams();
	const navigate = useNavigate();
	const [showLoading, hideLoading] = useLoading();

	const getProductDetail = () => {
		showLoading();
		productApi
			.get(params.productId)
			.then((res) => {
				hideLoading();
				setSlidePicProduct([...res.slideImage, res.avatarProduct]);
				setProductDetail(res);
			})
			.catch((err: Error) => {
				hideLoading();
				console.log(err);
			});
	};

	const getProductSuggestion = () => {
		productApi
			.getSuggestion(3, productDetail?.category, productDetail?.brand)
			.then((res) => {
				setProductSuggestion(res);
			})
			.catch((err: Error) => console.log(err));
	};

	useEffect(() => {
		getProductDetail();
	}, [params?.productId]);

	useEffect(() => {
		getProductSuggestion();
	}, [productDetail]);

	return (
		<>
			<div className="ProductDetail bg-white rounded-xl px-[56px] py-[39px] mt-10 mb-10">
				<div
					onClick={() => {
						navigate(-1);
					}}
					className="Back sm:w-[30%] lg:w-[20%] flex justify-start items-center gap-5 cursor-pointer hover:scale-105 duration-100"
				>
					<BiArrowBack className="fill-[#00ADE8] text-xl" />
					<span className="text-[#00ADE8] mx-[-10px] text-lg">Quay lại</span>
				</div>
				<div className="InfoProduct grid grid-cols-12 sm:gap-5 md:gap-5 lg:gap-10 mt-10">
					<div className="ContentInfo sm:col-span-12 lg:col-span-5">
						<InfoProduct product={productDetail} />
					</div>
					<div className="SlideImageProduct sm:col-span-12 lg:col-span-7">
						{productDetail?.slideImage.length === 0 ||
						productDetail?.slideImage.every((item) => item === null) ? (
							<div className="flex justify-center items-center bg-black py-8">
								<img
									className="w-[90%] object-cover"
									src={`${process.env.REACT_APP_URL_LOAD_IMG}${productDetail?.avatarProduct}`}
								/>
							</div>
						) : (
							<div>
								<SlideImage slidePicProduct={slidePicProduct} />
							</div>
						)}
					</div>
				</div>
				{productSuggestion?.length === 0 ||
				(productSuggestion?.length === 1 &&
					productSuggestion[0]._id === productDetail?._id) ? null : (
					<div className="ListProduct mt-10">
						<p className="Title mb-3 font-medium">Gợi ý cho bạn: </p>
						<div className="grid grid-cols-12 gap-6">
							{productSuggestion
								?.filter(
									(product: Product) => product._id !== productDetail?._id
								)
								.map((product: Product, index: number) => (
									<div
										key={index}
										className="sm:col-span-12 md:col-span-6 lg:col-span-4"
									>
										<BoxProduct product={product} />
									</div>
								))}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default PageProductDetail;
