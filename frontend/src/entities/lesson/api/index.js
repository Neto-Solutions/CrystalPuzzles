import { $authHost } from '@shared/api/axios.instances';

const createLesson = async ({
	space_id,
	trainer_id,
	trainer_comments,
	start
}) => {
	const { data } = $authHost.post('/Lesson', {
		space_id,
		trainer_id,
		trainer_comments,
		start
	});
	return data;
};

const getLesson = async (id) => {
	const { data } = await $authHost.get(`/lesson/${id}`);
	return data;
};

const getAllLessons = async ({
	page,
	page_size,
	search_string = '',
	start_date,
	trainer
}) => {
	const { data } = await $authHost.get(`/lesson`, {
		page_number: page,
		page_size,
		search_string,
		start_date,
		trainer
	});
	return data;
};

const updateLesson = async (
	id,
	space_id,
	trainer_id,
	trainer_comments,
	start
) => {
	const { data } = $authHost.put(`/Lesson`, {
		id,
		space_id,
		trainer_id,
		trainer_comments,
		start
	});
	return data;
};

const deleteLesson = async (id) => {
	const { data } = $authHost.delete(`/lesson/${id}`);
	return data;
};

export { createLesson, getLesson, getAllLessons, updateLesson, deleteLesson };
