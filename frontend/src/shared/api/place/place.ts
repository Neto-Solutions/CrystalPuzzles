import { $authHost } from '../axios.instances';

class Place {
	#host = $authHost;

	async get() {
		const data = await this.#host
			.get(`/space`)
			.then(({ data: records }) => [records, null])
			.catch(() => [null, 'Не удалось получить места']);
		return data;
	}

	async getById(id: string | number) {
		const data = await this.#host
			.get('/space/' + id)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось получить место']);
		return data;
	}
}

export default new Place();
