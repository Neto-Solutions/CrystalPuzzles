import { $authHost } from '@shared/api/axios.instances';
import { IUserParam } from './user.inerface';

class User {
	#host = $authHost;

	async getStudents(params: IUserParam = {}) {
		const {
			data: { records }
		} = await this.#host.get('/student', { params });
		return records;
	}

	async getTrainers(params: IUserParam = {}) {
		const {
			data: { records }
		} = await this.#host.get('/trainer', { params });
		return records;
	}

	async getSupervisors(params: IUserParam = {}) {
		const {
			data: { records }
		} = await this.#host.get('/supervisor', { params });
		return records;
	}

	async getAdmins(params: IUserParam = {}) {
		const {
			data: { records }
		} = await this.#host.get('/admin', { params });
		return records;
	}

	// get user avatar (temp)
	async getAvatar() {
		const { data } = await this.#host.get('/profile/get-photo');
		return data;
	}

	// update avatar (temp)
	async updateAvatar(avatar: any) {
		if (avatar > 0 && avatar < 10) {
			return await this.#host.post('profile/set-avatar', { avatar_id: avatar });
		} else {
			const formData = new FormData();
			formData.append('file', avatar);
			return await this.#host.put('/profile/set-photo', formData);
		}
	}

	//update password
	async updatePassword(params: any) {
		const { old_password, new_password } = params;
		const { data } = await this.#host.post('/user/change-password', {
			old_password,
			new_password
		});
		return data;
	}
}

export default new User();
