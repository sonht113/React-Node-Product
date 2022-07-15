import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextProduct } from '../context/ProductContext';

export const useShowAlert = () => {
	const { setIsShowAlert, setAction } = useContext(ContextProduct);
	const navigate = useNavigate();
	const handleOpenAlert = (action: string, id?: string) => {
		setIsShowAlert(true);
		setAction(action);
		if(action === 'update') {
			setTimeout(() => {
				navigate(`/product-show/product-detail/${id}`)
			}, 2000)
		}
		setTimeout(() => {
			setAction('');
			setIsShowAlert(false)
		}, 1800);
	};
    return {handleOpenAlert};
};