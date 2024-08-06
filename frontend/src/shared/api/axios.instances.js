import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_API || window.API_URL;

const $host = axios.create();

const $authHost = axios.create();

$authHost.interceptors.request.use((config) => {
	const token = Cookies.get('token');
	if (!token) return config;

	config.headers.authorization = `Bearer ${token}`;
	return config;
});

$authHost.interceptors.response.use(
	(res) => res,
	async (err) => {
		// if err
		if (
			err.response.data.error == 'Unauthorized' &&
			location.pathname !== '/login' &&
			location.pathname !== '/registration'
		) {
			location.href = '/login';
		}
	}
);

export { $host, $authHost };
