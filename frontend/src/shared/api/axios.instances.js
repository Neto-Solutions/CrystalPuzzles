import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = window.API_URL || process.env.REACT_APP_SERVER_API;
const $host = axios.create();

const $authHost = axios.create();

$authHost.interceptors.request.use((config) => {
	config.headers.authorization = `Bearer ${Cookies.get('token')}`;
	return config;
});

export { $host, $authHost };
