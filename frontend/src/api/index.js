import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_API;

const $host = axios.create();

const $authHost = axios.create({
	headers: {
		authorization: `Bearer ${Cookies.get('token')}`
	}
});

export { $host, $authHost };
