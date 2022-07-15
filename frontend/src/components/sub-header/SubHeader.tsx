import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { validateSearch } from '../../common/validate';
import { useUrl } from '../../hook/useUrl';

interface SubHeaderProps {
	setIsOpenModal?: any;
	query?: any;
	getCategoriesForm?: any;
}

const SubHeader: React.FC<SubHeaderProps> = ({
	setIsOpenModal,
	query,
	getCategoriesForm,
}) => {
	let [searchParams, setSearchParams] = useSearchParams();
	const [filterQuery, setFilterQuery] = useState<any>();
	const [searchValue, setSearchValue] = useState<string>(
		searchParams.get('keyword') || ''
	);

	const url = useUrl().location.pathname;

	useEffect(() => {
		if (filterQuery) {
			setSearchParams(filterQuery);
		}
	}, [filterQuery]);

	useEffect(() => {
		if (query) {
			setFilterQuery({ ...query });
		}
	}, []);

	const handleSearch = (e: any) => {
		setSearchValue(e.target.value);
		const value = e.target.value ? e.target.value.trim() : '';
		if (!value) {
			delete query.keyword;
			setFilterQuery({ ...query });
		} else {
			setFilterQuery({ ...query, keyword: value });
		}
	};
	return (
		<div className="Sub-Header flex justify-between items-center pt-8">
			<div className="Button-Create-Product group hover:scale-110 duration-150">
				{url === '/product-manage' || url.includes('/product-manage') ? (
					<span
						onClick={() => {
							setIsOpenModal(true);
							getCategoriesForm();
						}}
						className="px-5 py-3 cursor-pointer text-[#00ADE8] border border-[#00ADE8] group-hover:bg-[#00ADE8] group-hover:text-white group-hover:duration-150 rounded-lg"
					>
						Thêm sản phẩm
					</span>
				) : null}
			</div>
			<div className="Search md:w-[200px] lg:w-[400px] min-w-[150px] max-w-[400px]">
				<form className="flex items-center">
					<label htmlFor="simple-search" className="sr-only">
						Search
					</label>
					<div className="relative w-full">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<svg
								className="w-5 h-5 text-gray-500 dark:text-gray-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
						<input
							onChange={handleSearch}
							type="text"
							id="simple-search"
							value={searchValue}
							onKeyDown={(evt) => validateSearch(evt)}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus-visible:outline-none focus:outline-[#00ADE8] focus:border-[#00ADE8]"
							placeholder="Search"
							required
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SubHeader;
