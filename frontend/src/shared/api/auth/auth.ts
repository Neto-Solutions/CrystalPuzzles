import { $authHost } from '@shared/api/axios.instances';
import Cookies from 'js-cookie';
import {
	EditProfileParams,
	LoginParams,
	RegisterParams
} from './auth.interface';

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
		const { email, password, reload = true } = params;
		const formData = new FormData();
		formData.append('username', email);
		formData.append('password', password);

		const data = await this.#host
			.post('/auth/login', formData)
			.then(({ data: { access_token } }) => {
				Cookies.set('token', access_token);
				if (reload) location.replace('/');
			})
			.then(() => [null, null])
			.catch(() => [null, 'Не верное сочетание логина/пароля']);
		return data;
	}

	async updateProfile(params: EditProfileParams) {
		const data = await this.#host
			.put('/profile/edit', params)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось обновить профиль']);
		return data;
	}

	async changePassword(params: {
		email: string;
		old_password: string;
		new_password: string;
	}) {
		const { email, old_password, new_password } = params;
		let data = await this.login({
			email,
			password: old_password,
			reload: false
		});
		if (data[1]) return data;
		data = await this.#host
			.post('/user/change-password', { old_password, new_password })
			.then(({ data }) => [data, null])
			.then(() => location.replace('/'))
			.catch(() => [null, 'Не удалось изменить пароль']);
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
