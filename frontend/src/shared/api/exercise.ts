import { $authHost } from './axios.instances';
class Exercise {
	#host = $authHost;

	async get() {
		const {
			data: { records }
		} = await this.#host.get('/training');
		return records;
	}
}

export default new Exercise();
