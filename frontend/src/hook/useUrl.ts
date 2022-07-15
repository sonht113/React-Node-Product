import { useLocation } from 'react-router-dom';
export const useUrl = () => {
	const location = useLocation();
	return { location };
};
