import { $authHost } from './axios.instances';
class Exercise {
	#host = $authHost;

	async get() {
		const { data } = await this.#host.get('/exercise');
		return data;
	}
}

export default new Exercise();
