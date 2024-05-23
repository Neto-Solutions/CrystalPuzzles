import axios from 'axios';
import Cookies from 'js-cookie';
import { serverUrl } from '../../../config.json';

axios.defaults.baseURL = serverUrl;

const $host = axios.create();

const $authHost = axios.create({
	headers: {
		authorization: `Bearer ${Cookies.get('token')}`
	}
});

export { $host, $authHost };
