import { $authHost } from './axios.instances';

class Reward {
	#host = $authHost;

	async add(id: any, rewardId: any) {
		this.#host.post(`/reward/${id}`, {
			params: { rewardId }
		});
	}

	async get() {
		const { data } = await this.#host.get(`/reward`);
		return data;
	}
}

export default new Reward();
