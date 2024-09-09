import { $authHost } from './axios.instances';

class Place {
	#host = $authHost;

	async get() {
		const {
			data: { records }
		} = await this.#host.get(`/space`);
		return records;
	}

	async getById(id: string) {
		const { data } = await this.#host.get(`/space/${id}`);
		return data;
	}
}

export default new Place();
