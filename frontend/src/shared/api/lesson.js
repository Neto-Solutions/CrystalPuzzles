import { $authhost } from './axios.instances';

class Lesson {
	#host = $authhost;

	async add(params) {
		const { space_id, trainer_id, trainer_comments, start } = params;
		const { data } = await this.#host.post(`/lesson`, {
			space_id,
			trainer_id,
			trainer_comments,
			start
		});
		return data;
	}

	async get(params) {
		const { start, end, limit, offset } = params;
		const { data } = await this.#host.get(`/lesson`, {
			params: { start, end, limit, offset }
		});
		return data;
	}

	async getById(id) {
		const { data } = await this.#host.get(`/lesson/${id}`);
		return data;
	}

	async update(id, params) {
		const {
			space_id,
			trainer_id,
			trainer_comments,
			start,
			exercises,
			students
		} = params;
		const { data } = await this.#host.put(`/lesson/${id}`, {
			space_id,
			trainer_id,
			trainer_comments,
			start,
			exercises,
			students
		});
		return data;
	}

	async delete(id) {
		const { data } = await this.#host.delete(`/lesson/${id}`);
		return data;
	}
}

export default new Lesson();
