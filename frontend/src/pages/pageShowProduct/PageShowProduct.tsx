import React, { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import { Empty, Layout } from 'antd';
import BoxProduct from '../../components/box-product/BoxProduct';
import Paginate from '../../components/pagination/Pagination';
import SubHeader from '../../components/sub-header/SubHeader';
import { ListResponse } from '../../models/Common';
import { Product } from '../../models/Product';
import productApi from '../../api/productApi';
import { useLocation, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import useLoading from '../../hook/useLoading';
const { Content } = Layout;

interface queryDetail {
	category?: any;
	brand?: any;
}

interface showProductProps {}

const PageShowProduct: React.FC<showProductProps> = () => {
	let [productData, setProductData] = useState<
		ListResponse<Product> | undefined
	>();
	const [queryDetailPage, setQueryDetailPage] = useState<queryDetail>({});
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const query = queryString.parse(location.search);
	const typingTimeoutRef = useRef<any>(null);

	const [showLoading, hideLoading] = useLoading();

	const getProduct = () => {
		showLoading();
		productApi
			.getAll(
				6,
				Number(searchParams.get('page')),
				searchParams.get('category'),
				searchParams.get('brand'),
				searchParams.get('keyword')
			)
			.then((res) => {
				hideLoading();
				setProductData(res);
			})
			.catch((err: AxiosError) => {
				hideLoading();
				throw new Error('Can not get product!');
			});
	};

	useEffect(() => {
		searchParams.get('category') || searchParams.get('brand')
			? setQueryDetailPage({
					...queryDetailPage,
					category: searchParams.get('category'),
					brand: searchParams.get('brand'),
			  })
			: setQueryDetailPage({ ...queryDetailPage, category: '', brand: '' });

		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}
		typingTimeoutRef.current = setTimeout(() => {
			getProduct();
		}, 300);
	}, [searchParams]);

	return (
		<>
			<SubHeader query={query} />
			<Content className="grid grid-cols-12 min-h-[500px] sm:gap-0 md:gap-6 lg:gap-10 bg-white rounded-2xl mt-8 mb-10 sm:p-10 md:p-10 lg:p-10">
				{productData?.products?.length === 0 ? (
					<div className="col-span-12">
						<Empty className="text-gray-400 font-semibold" />
					</div>
				) : (
					productData?.products?.map((item, index) => (
						<div
							key={index}
							className="sm:col-span-12 sm:mb-10 md:col-span-6 md:mb-0 lg:mb-0 lg:col-span-4 4xl:col-span-2 rounded-xl"
						>
							<BoxProduct queryDetailPage={queryDetailPage} product={item} />
						</div>
					))
				)}
				{productData ? (
					productData?.products?.length === 0 ? null : (
						<div className="col-span-12 mx-auto">
							<Paginate
								totalPage={productData?.pagination?.totalPage}
								query={query}
							/>
						</div>
					)
				) : (
					<div className="col-span-12">
						<Empty className="text-gray-400 font-semibold" />
					</div>
				)}
			</Content>
		</>
	);
};

export default PageShowProduct;
