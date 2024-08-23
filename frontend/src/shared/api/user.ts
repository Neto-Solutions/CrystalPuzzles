import { $authHost } from '@shared/api/axios.instances';

class User {
	#host = $authHost;

	// get users
	async getAll({ search_string = '' }) {
		const { data } = await this.#host.get(`/users`, { search_string }); // student by actual api
		return data;
	}

	// get user avatar (temp)
	async getAvatar() {
		const { data } = await this.#host.get('/profile/get-photo');
		return data;
	}

	// update avatar
	async updateAvatar(avatar) {
		if (avatar > 0 && avatar < 10) {
			return await this.#host.post('profile/set-avatar', { avatar_id: avatar });
		} else {
			const formData = new FormData();
			formData.append('file', avatar);
			return await this.#host.put('/profile/set-photo', formData);
		}
	}

	//update password
	async updatePassword(params) {
		const { old_password, new_password } = params;
		const { data } = await this.#host.post('/user/change-password', {
			old_password,
			new_password
		});
		return data;
	}
}

export default new User();
