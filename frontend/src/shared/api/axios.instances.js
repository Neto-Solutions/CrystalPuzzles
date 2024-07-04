import axios from 'axios';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_API || window.API_URL;
const $host = axios.create();

const $authHost = axios.create();

$authHost.interceptors.request.use((config) => {
	config.headers.authorization = `Bearer ${Cookies.get('token')}`;
	return config;
});

$authHost.interceptors.response.use(
	(res) => res,
	async (error) => {
		if (error.response.status === 403) {
			redirect('/login');
		}
	}
);

export { $host, $authHost };
