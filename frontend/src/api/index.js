import axios from 'axios';
import Cookies from 'js-cookie';

export const $host = axios.create({
	baseURL: process.env.REACT_APP_SERVER_API
});

export const $authHost = axios.create({
	baseURL: process.env.REACT_APP_SERVER_API,
	headers: {
		authorization: `Bearer ${Cookies.get('token')}`
	}
});
