import { $authHost } from './axios.instances';
import { UserI, CheckListI } from './checkList.interface';

class CheckList {
	#host = $authHost;
	async create(params: CheckListI) {
		const { data } = await this.#host.post(
			`/lesson/create-check/${params.lesson_id}`,
			{ params }
		);
		return data;
	}
	async addUser(params: UserI) {
		const { data } = await this.#host.put(
			`/lesson/add-student/${params.lesson_id}`,
			{ params }
		);
		return data;
	}
	async removeUser(params: UserI) {
		const { data } = await this.#host.put(
			`/lesson/remove-user/${params.lesson_id}`,
			{
				params
			}
		);
		return data;
	}
}

export default new CheckList();
