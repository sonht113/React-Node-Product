import { toast } from 'react-toastify';

	export const setToast = (messageError: string) => {
		toast.error(`❌ ${messageError}`, {
			position: 'top-center',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};