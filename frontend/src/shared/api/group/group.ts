import { $authHost } from '../axios.instances';
import { AddStudentI, GroupI } from './group.interface';

class Group {
	#host = $authHost;

	async create(group: GroupI) {
		const data = await this.#host
			.post('/group', group)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось создать группу']);
		return data;
	}

	async get() {
		const data = await this.#host
			.get('/group')
			.then(({ data: { records } }) => [records, null])
			.catch(() => [null, 'Не удалось получить список групп']);
		return data;
	}

	async getById(id: string) {
		const data = await this.#host
			.get('/group/' + id)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось получить группу']);
		return data;
	}

	async update(id: string, params: GroupI) {
		const data = await this.#host
			.put('/group/' + id, params)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось обновить группу']);
		return data;
	}

	async delete(id: string) {
		const data = await this.#host
			.delete('/group/' + id)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось удалить группу']);
		return data;
	}

	async addStudent(params: AddStudentI) {
		const data = await this.#host
			.post('/group/add-student/', params)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось удалить группу']);
		return data;
	}
}
export default new Group();
