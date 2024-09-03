import { $authHost } from './axios.instances';

class Place {
	#host = $authHost;

	async get() {
		const { data } = await this.#host.get(`/space`);
		return data;
	}

	async getById(id: string) {
		const { data } = await this.#host.get(`/space/${id}`);
		return data;
	}
}

export default new Place();
