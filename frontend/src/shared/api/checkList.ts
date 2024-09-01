import { $authHost } from './axios.instances';

class CheckList {
	#host = $authHost;

	async get({ lessonId, studentId = null }: any) {
		const { data } = await this.#host.get('/checkList', {
			params: { lesson_id: lessonId, student_id: studentId }
		});
		return data;
	}
}

export default new CheckList();
