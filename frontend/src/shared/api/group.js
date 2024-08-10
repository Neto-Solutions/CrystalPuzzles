import { $authhost } from './axios.instances';

class Group {
	#host = $authhost;

	async create(group) {
		const { data } = await this.#host.post('/group', group);
		return data;
	}

	async getAll() {
		const { data } = await this.#host.get('/group');
		return data;
	}

	// async getById(id) {
	// 	const { data } = await this.#host.get(`/group/${id}`);
	// 	return data;
	// }

	// async update(params) {
	// 	const { id, name, trainer_id } = params;
	// 	const { data } = await this.#host.put(`/group`, { id, name, trainer_id });
	// 	return data;
	// }

	// async delete(id) {
	// 	const { data } = await this.#host.delete(`/group/${id}`);
	// 	return data;
	// }

	async addUser(params) {
		const { student_id, group_id } = params;
		const { data } = await this.#host.post(`/group/add-student`, {
			student_id,
			group_id
		});
		return data;
	}
	async removeUser(params) {
		const { student_id, group_id } = params;
		const { data } = await this.#host.delete(`/group/delete-student`, {
			student_id,
			group_id
		});
		return data;
	}
}
export default new Group();
