export type ProductDocument = Product | { [key: string]: any }

export interface Product {
	_id?: string;
	name: string;
	category: string;
	brand: string;
	price: number;
	description: string;
	avatarProduct: string;
	slideImage: string[];
}
