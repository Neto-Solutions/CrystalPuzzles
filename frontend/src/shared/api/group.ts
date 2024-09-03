import { $authHost } from './axios.instances';
import { GroupI } from './group.interface';

class Group {
	#host = $authHost;

	async create(group: GroupI) {
		const { data } = await this.#host.post('/group', group);
		return data;
	}

	async getAll() {
		const {
			data: { records }
		} = await this.#host.get('/group');
		return records;
	}

	// async getById(id: string) {
	// 	const { data } = await this.#host.get(`/group/${id}`);
	// 	return data;
	// }

	// async update(params: any) {
	// 	const { id, name, trainer_id } = params;
	// 	const { data } = await this.#host.put(`/group`, { id, name, trainer_id} : any);
	// 	return data;
	// }

	// async delete(id: string) {
	// 	const { data } = await this.#host.delete(`/group/${id}`);
	// 	return data;
	// }

	async addUser(params: any) {
		const { student_id, group_id } = params;
		const { data } = await this.#host.post(`/group/add-student`, {
			student_id,
			group_id
		});
		return data;
	}
	async removeUser(params: any) {
		const { student_id, group_id } = params;
		const { data } = await this.#host.delete(`/group/delete-student`, {
			params: {
				student_id,
				group_id
			}
		});
		return data;
	}
}
export default new Group();
