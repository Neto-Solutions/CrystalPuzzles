import { $authHost } from './axios.instances';

class Lesson {
	#host = $authHost;

	async add(params: any) {
		const { space_id, trainer_id, trainer_comments, start } = params;
		const { data } = await this.#host.post(`/lesson`, {
			space_id,
			trainer_id,
			trainer_comments,
			start
		});
		return data;
	}

	async get(params: IParams) {
		const { start, end, limit, offset } = params;
		const {
			data: { records }
		} = await this.#host.get(`/lesson`, {
			params: { start_date: start, end_date: end, limit, offset }
		});
		return records;
	}

	async getById(id: string) {
		const { data } = await this.#host.get(`/lesson/${id}`);
		return data;
	}

	async update(id: string, params: any) {
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

	async delete(id: string) {
		const { data } = await this.#host.delete(`/lesson/${id}`);
		return data;
	}
}

export default new Lesson();

interface IParams {
	start?: Date;
	end?: Date;
	limit?: number;
	offset?: number;
}
