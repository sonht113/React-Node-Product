export const validate = {
	name: [
		{ required: true, message: 'Vui lòng hãy nhập tên sản phẩm!' },
		{
			pattern: /^[^!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+$/,
			message: 'Vui lòng không nhập ký tự đặc biệt!',
		},
		{ min: 4, message: 'Tên sản phẩm quá ngắn!' },
	],
	category: [
		{ required: true, message: 'Vui lòng hãy chọn danh mục sản phẩm!' },
	],
	brand: [{ required: true, message: 'Vui lòng hãy chọn hãng sản xuất!' }],
	description: [{ max: 500, message: 'Mô tả không vượt quá 500 ký tự!' }],
};

export const validateSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
	const format = [
		'!',
		'"',
		"'/",
		'`',
		'#',
		'%',
		'&',
		',',
		';',
		':',
		'<',
		'>',
		'=',
		'@',
		'{',
		'}',
		'~',
		'^',
		'.',
		'-',
		'_',
		'+',
		'*',
		'/',
		'?',
		'\n',
		'|',
		'(',
		')',
		'[',
		']',
		'$',
		'=',
	];
	format.includes(e.key) && e.preventDefault();
};

export const validateSpecialNumber = (
	e: React.KeyboardEvent<HTMLInputElement>
) => {
	const format = ['e', 'E', '+', '-', '.'];
	format.includes(e.key) && e.preventDefault();
};

export const validatePrice = (value: string | undefined) => {
	if (value) {
		if (parseInt(value) < 10000) {
			return 'Giá tiền của bạn quá nhỏ. Hãy chọn một giá tiền khác!';
		} else if (parseInt(value) > 1000000000) {
			return 'Giá tiền của bạn quá lớn. Hãy chọn một giá tiền khác!';
		} else {
			return '';
		}
	} else {
		return 'Vui lòng hãy nhập giá tiền của sản phẩm!';
	}
};
