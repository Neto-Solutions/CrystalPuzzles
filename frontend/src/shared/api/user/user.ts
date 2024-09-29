import { $authHost } from '@shared/api/axios.instances';
import { PasswordParams } from './user.inerface';

class User {
	#host = $authHost;

	async getStudents({ search_string = '' } = {}) {
		const data = await this.#host
			.get('/student', { params: { search_string } })
			.then(({ data: { records } }) => [records, null])
			.catch(() => [null, 'Не удалось получить студентов']);
		return data;
	}

	async getTrainers() {
		const data = await this.#host
			.get('/trainer')
			.then(({ data: { records } }) => [records, null])
			.catch(() => [null, 'Не удалось получить тренеров']);
		return data;
	}

	async getSupervisors() {
		const data = await this.#host
			.get('/supervisor')
			.then(({ data: { records } }) => [records, null])
			.catch(() => [null, 'Не удалось получить супервайзеров']);
		return data;
	}

	async getAdmins() {
		const data = await this.#host
			.get('/admin')
			.then(({ data: { records } }) => [records, null])
			.catch(() => [null, 'Не удалось получить администраторов']);
		return data;
	}

	async getAvatar() {
		const data = await this.#host
			.get('/profile/get-photo')
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось получить аватар']);
		return data;
	}

	async setAvatar(avatar: File) {
		const formData = new FormData();
		formData.append('file', avatar);
		const data = await this.#host
			.put('/profile/set-photo', formData)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось загрузить аватар']);
		return data;
	}

	async setDefaultAvatar(id = 1) {
		const data = await this.#host
			.put('/profile/set-avatar', { avatar_id: id })
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось установить аватар']);
		return data;
	}

	async removeAvatar() {
		const data = await this.#host
			.delete('/profile/remove-photo')
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось удалить аватар']);
		return data;
	}

	async updatePassword(params: PasswordParams) {
		const data = await this.#host
			.post('/user/change-password', params)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось изменить пароль']);
		return data;
	}
}

export default new User();
