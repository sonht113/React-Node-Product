import { Category } from '../models/Category';
import axiosClient from './clientAxios';

const categoryApi = {
	get: async (): Promise<Category[]> => {
		const url = '/categories/all-category';
		return await axiosClient.get(url);
	},
};

export default categoryApi;