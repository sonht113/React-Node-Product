import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';

interface paginateProps {
	totalPage?: number;
	query?: any;
}

const Paginate: React.FC<paginateProps> = ({ totalPage, query }) => {
	let [searchParams, setSearchParams] = useSearchParams();
	const [queryFilter, setQueryFilter] = useState<any>();

	useEffect(() => {
		if (query) {
			setQueryFilter({ ...query });
		}
	}, []);

	useEffect(() => {
		if (queryFilter) {
			setSearchParams(queryFilter);
		}
	}, [queryFilter]);

	const handlePaginate = (page: number) => {
		setQueryFilter({ ...query, page: page });
	};
	return (
		<Pagination
			onChange={(page) => handlePaginate(page)}
			current={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
			total={totalPage ? totalPage * 10 : 1}
		/>
	);
};

export default Paginate;
