import { $authHost } from '@shared/api/axios.instances';
import Cookies from 'js-cookie';

class Auth {
	#host = $authHost;

	async getProfile() {
		const data = await this.#host
			.get('/profile')
			.then((res) => [res.data, null])
			.catch((err) => [null, err]);
		return data;
	}

	async register(params: any) {
		const {
			email,
			password,
			firstname,
			lastname,
			surname,
			birthday,
			is_man,
			contact
		} = params;
		const { data }: any = await this.#host
			.post('/user/register', {
				email,
				password,
				firstname,
				lastname,
				surname,
				birthday,
				is_man,
				contact
			})
			.then(() => this.login({ email, password }))
			.catch((err) => [null, err]);
		return data;
	}

	async login(params: any) {
		const { username, password } = params;
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);

		const data = await this.#host
			.post('/auth/login', formData)
			.then((res) =>
				Cookies.set('token', res.data.access_token, {
					expires: 1,
					sameSite: 'strict'
				})
			)
			.then(() => location.replace('/'))
			.catch((err) => [null, err]);
		return data;
	}

	async updateToken() {
		const { data }: any = await this.#host
			.post('/auth/refresh-token')
			.then((res) =>
				Cookies.set('token', res.data.access_token, {
					expires: 1,
					sameSite: 'strict'
				})
			);
		return data;
	}

	async logout() {
		const data = await this.#host
			.post('/auth/logout')
			.then(() => Cookies.remove('token'));
		return data;
	}
}

export default new Auth();
