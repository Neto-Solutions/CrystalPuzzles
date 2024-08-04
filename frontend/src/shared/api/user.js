import { $authhost } from '@shared/api/axios.instances';
import Cookies from 'js-cookie';

class User {
	#host = $authhost;

	async register(params) {
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
		const { data } = await this.#host.post('/user/register', {
			email,
			password,
			firstname,
			lastname,
			surname,
			birthday,
			is_man,
			contact
		});
		return data;
	}

	async login(params) {
		const { username, password } = params;
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);

		const data = await this.#host.post('/auth/login', formData).then((res) =>
			Cookies.set('token', res.data.access_token, {
				expires: 1,
				sameSite: 'strict'
			})
		);
		return data;
	}

	async updateToken() {
		const { data } = await this.#host.post('/auth/refresh-token').then((res) =>
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

	async updatePassword(params) {
		const { old_password, new_password } = params;
		const { data } = await this.#host.post('/user/change-password', {
			old_password,
			new_password
		});
		return data;
	}

	// get user profile
	async get() {
		const { data } = await this.#host.get('/profile');
		return data;
	}

	// get all users
	async getAll({ search_string = '' }) {
		const { data } = await this.#host.get(`/users`, { search_string }); // student by actual api
		return data;
	}

	async getAvatar() {
		const { data } = await this.#host.get('/profile/get-photo');
		return data;
	}

	async updateAvatar(avatar) {
		if (avatar > 0 && avatar < 10) {
			return await this.#host.post('profile/set-avatar', { avatar_id: avatar });
		} else {
			const formData = new FormData();
			formData.append('file', avatar);
			return await this.#host.put('/profile/set-photo', formData);
		}
	}
}
export default new User();
