import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface BoxProps {
	index: number;
	img: string | null;
	name?: string;
	setSlidePic: any;
	slidePic: any;
}

interface PreviewImgProps {
	index: number;
	img: string;
	setProductPicPreview: any;
	setSlidePic?: any;
	slidePic?: any;
}

interface LabelProps {
	index: number;
}

const BoxUploadImageSlide: React.FC<BoxProps> = ({
	index,
	img,
	slidePic,
	setSlidePic,
}) => {
	const [productPicPreview, setProductPicPreview] = useState<any>('');

	useEffect(() => {
		if (img) {
			setProductPicPreview(`${process.env.REACT_APP_URL_LOAD_IMG}${img}`);
		}
	}, []);

	const handleOnChangeImg = (e: any) => {
		if (e.target.files[0] === undefined) {
			setProductPicPreview('');
		} else {
			const arr = [...slidePic];
			arr[index - 1] = e.target.files[0];
			setSlidePic(arr);
			setProductPicPreview(URL.createObjectURL(e.target.files[0]));
		}
	};

	return (
		<div className="box-image-slide flex justify-center">
			{productPicPreview === '' ? (
				<Label index={index} />
			) : (
				<>
					<PreviewImg
						img={productPicPreview}
						index={index}
						setProductPicPreview={setProductPicPreview}
						setSlidePic={setSlidePic}
						slidePic={slidePic}
					/>
				</>
			)}
			<input
				className="mt-[-10px]"
				onChange={(e) => handleOnChangeImg(e)}
				style={{ display: 'none' }}
				type="file"
				id={`slidePic${index}`}
				name={`slide_pic${index}`}
				accept="image/*"
			/>
		</div>
	);
};

const Label: React.FC<LabelProps> = ({ index }) => {
	return (
		<label
			htmlFor={`slidePic${index}`}
			className="flex justify-center items-center cursor-pointer hover:scale-105 duration-100 w-[80px] h-[80px] border-2 drop-shadow-lg rounded-xl"
		>
			<AiOutlinePlus className="fill-[#00CCFF] text-5xl" />
		</label>
	);
};

const PreviewImg: React.FC<PreviewImgProps> = ({
	index,
	img,
	setProductPicPreview,
	setSlidePic,
	slidePic,
}) => (
	<div className="Preview-Product-Img relative cursor-pointer group flex justify-center items-center w-full h-[100px] border-2 mx-auto">
		<img className="max-w-full h-[100%] object-cover" src={img} />
		<div className="modal-slide-img absolute flex-col justify-end w-full h-full top-0 left-0 bg-black opacity-70 z-[1] invisible group-hover:visible duration-150">
			<label
				htmlFor={`slidePic${index}`}
				className="mb-2 flex justify-center pt-3 invisible group-hover:visible "
			>
				<span className="cursor-pointer px-3 py-2 bg-gray-500 border-white text-white font-semibold text-xs rounded-lg border hover:scale-105 duration-100">
					Cập nhật
				</span>
			</label>
			<div className="flex justify-center invisible group-hover:visible ">
				<span
					onClick={() => {
						if (img) {
							let arr = [...slidePic];
							arr[index - 1] = null;
							setSlidePic(arr);
						}
						setProductPicPreview('');
					}}
					className="cursor-pointer px-6 py-2 bg-gray-500 border-white text-white font-semibold text-xs rounded-lg border hover:scale-105 duration-100"
				>
					Xoá
				</span>
			</div>
		</div>
	</div>
);

export default BoxUploadImageSlide;
