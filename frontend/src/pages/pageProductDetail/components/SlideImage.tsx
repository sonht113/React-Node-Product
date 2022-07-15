import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';

interface SlideImageProps {
	slidePicProduct: string[];
}
const SlideImage: React.FC<SlideImageProps> = ({ slidePicProduct }) => {
	const [slideImage, setSlideImage] = useState<string[] | undefined>();
	useEffect(() => {
		let arr: any = [];
		slidePicProduct?.forEach((item: string | null) => {
			if (item) {
				arr.push(item);
			}
		});
		setSlideImage(arr);
	}, [slidePicProduct]);
	return (
		<Carousel className="bg-black" autoplay effect={'scrollx'}>
			{slideImage?.map((img: string, index: number) => (
				<div key={index} className="bg-black !flex justify-center items-center">
					<img
						className="py-5 w-full !h-[100%] object-cover"
						src={`${process.env.REACT_APP_URL_LOAD_IMG}${img}`}
					/>
				</div>
			))}
		</Carousel>
	);
};

export default SlideImage;
