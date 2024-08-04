import { $authhost } from './axios.instances';

class Reward {
	constructor(host) {
		this.host = host;
	}
	async add(id, rewardId) {
		this.host.post(`/reward/${id}`, {
			params: { rewardId }
		});
	}

	async get() {
		const { data } = await this.host.get(`/reward`);
		return data;
	}
}

export default new Reward($authhost);
