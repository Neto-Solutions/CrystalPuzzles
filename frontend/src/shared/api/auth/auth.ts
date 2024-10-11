import { $authHost } from '@shared/api/axios.instances';
import Cookies from 'js-cookie';
import { LoginParams, RegisterParams } from './auth.interface';

class Auth {
	#host = $authHost;

	async getProfile() {
		const data = await this.#host
			.get('/profile')
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось получить профиль']);
		return data;
	}

	async register(params: RegisterParams): Promise<void | any> {
		const data = await this.#host
			.post('/user/register', params)
			.then((res) => {
				if (res.status === 409) {
					return [null, 'Такой пользователь уже существует'];
				} else {
					return this.login(params);
				}
			})
			.catch(() => [null, 'Не удалось зарегистрироваться']);

		return data;
	}

	async login(params: LoginParams): Promise<void | any> {
		const { email, password } = params;
		const formData = new FormData();
		formData.append('username', email);
		formData.append('password', password);

		const data = await this.#host
			.post('/auth/login', formData)
			.then(({ data: { access_token } }) => {
				Cookies.set('token', access_token);
			})
			.then(() => {
				location.replace('/');
			})
			.catch(() => [null, 'Не верное сочетание логина/пароля']);
		return data;
	}

	async updateToken() {
		const data = await this.#host
			.post('/auth/refresh-token')
			.then(({ data: { access_token } }) => Cookies.set('token', access_token))
			.catch(() => [null, 'Не удалось обновить токен']);
		return data;
	}

	async logout() {
		const data = await this.#host
			.post('/auth/logout')
			.then(() => Cookies.remove('token'))
			.then(() => location.replace('/'))
			.catch(() => [null, 'Не удалось выйти']);
		return data;
	}
}

export default new Auth();
