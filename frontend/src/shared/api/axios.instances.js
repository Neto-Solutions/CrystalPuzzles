import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = window.API_URL;

const $host = axios.create();

const $authHost = axios.create({
	headers: {
		authorization: `Bearer ${Cookies.get('token')}`
	}
});

export { $host, $authHost };
