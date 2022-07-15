export interface PaginationParam {
	page: number;
	limit?: number;
	category?: string;
	brand?: string;
	keyword?: string;
	totalPage: number;
}

export interface ListResponse<T> {
	products: T[];
	pagination: PaginationParam;
}
