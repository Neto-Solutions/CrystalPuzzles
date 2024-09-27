import { $authHost } from '../axios.instances';
import { CheckListI } from './checkList.interface';

class CheckList {
	#host = $authHost;
	async create(params: CheckListI) {
		const data = await this.#host
			.post(`/lesson/create-check`, params)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось создать чек-лист']);
		return data;
	}
}

export default new CheckList();
