import { Brand } from '../models/Brand';
import axiosClient from './clientAxios';

const brandApi = {
	get: async (): Promise<Brand[]> => {
		const url = '/brands/all-brand';
		return await axiosClient.get(url);
	},
    getDetail: async (id: string | undefined): Promise<Brand[]> => {
		const url = `/brands/brand-detail/${id}`;
		return await axiosClient.get(url);
	},
};

export default brandApi;