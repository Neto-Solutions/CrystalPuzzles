import { $authHost } from '../axios.instances';
import {
	LessonCreateParams,
	LessonGetParams,
	LessonUpdateParams,
	StudentI
} from './lesson.interface';

class Lesson {
	#host = $authHost;

	async create(params: LessonCreateParams) {
		const data = await this.#host
			.post(`/lesson`, params)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось добавить урок']);
		return data;
	}

	async get(params: LessonGetParams) {
		const data = await this.#host
			.get(`/lesson`, { params: params })
			.then(({ data: { records } }) => [records, null])
			.catch(() => [null, 'Не удалось получить уроки']);
		return data;
	}

	async getById(id: string) {
		const data = await this.#host
			.get('/lesson/' + id)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось получить урок']);
		return data;
	}

	async update(params: LessonUpdateParams) {
		const { id, ...rest } = params;
		const data = await this.#host
			.put('/lesson/' + id, rest)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось обновить урок']);
		return data;
	}

	async delete(id: string | number) {
		const data = await this.#host
			.delete('/lesson/' + id)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось удалить урок']);
		return data;
	}

	async addStudent(params: StudentI) {
		const { lesson_id, student_id } = params;
		const data = await this.#host
			.put('/lesson/add-user' + lesson_id, student_id)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось добавить студента']);
		return data;
	}
	async removeStudent(params: StudentI) {
		const { lesson_id, student_id } = params;
		const data = await this.#host
			.put('/lesson/remove-user' + lesson_id, student_id)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось добавить студента']);
		return data;
	}
}

export default new Lesson();
