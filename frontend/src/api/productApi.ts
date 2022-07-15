import { ListResponse } from './../models/Common';
import axiosClient from './clientAxios';
import { Product } from '../models/Product';

const productApi = {
	add: async (data: FormData): Promise<Product> => {
		const url = '/products/add-product';
		return await axiosClient.post(url, data);
	},
	getAll: async (
		limit: number,
		page: number,
		category?: string | null,
		brand?: string | null,
		keyword?: string | null
	): Promise<ListResponse<Product>> => {
		const url = '/products/all-product';
		return await axiosClient.get(url, {
			params: {
				page: page,
				limit: limit,
				category: category,
				brand: brand,
				keyword: keyword,
			},
		});
	},
	getSuggestion: async (
		limit: number,
		category?: string | null,
		brand?: string | null
	): Promise<Product[] | undefined> => {
		const url = '/products/product-suggestion';
		return await axiosClient.get(url, {
			params: {
				limit: 3,
				category: category,
				brand: brand,
			},
		});
	},
	get: async (id: string | undefined): Promise<Product> => {
		const url = `/products/product-detail/${id}`;
		return await axiosClient.get(url);
	},
	update: async (id: string | undefined, data: FormData): Promise<Product> => {
		const url = `/products/update-product/${id}`;
		return await axiosClient.put(url, data);
	},
	delete: async (id: string | undefined) => {
		const url = `/products/delete-product/${id}`;
		return await axiosClient.delete(url);
	},
};

export default productApi;
