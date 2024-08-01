import { $authHost } from '@shared/api/axios.instances';

const postData = async (params) => {
	const { space_id, trainer_id, trainer_comments, start } = params;
	const { data } = await $authHost.post(`/lesson`, {
		space_id,
		trainer_id,
		trainer_comments,
		start
	});
	return data;
};
const getAllData = async (start, limit) => {
	const { data } = await $authHost.get(`/lesson`, { params: { start, limit } });
	return data;
};

const getDataById = async (id) => {
	const { data } = await $authHost.get(`/lesson/${id}`);
	return data;
};

const updateData = async (id, params) => {
	const { space_id, trainer_id, trainer_comments, start, exercises, students } =
		params;
	const { data } = await $authHost.put(`/lesson/${id}`, {
		space_id,
		trainer_id,
		trainer_comments,
		start,
		exercises,
		students
	});
	return data;
};

const deleteData = async (id) => {
	const { data } = await $authHost.delete(`/lesson/${id}`);
	return data;
};

export { getAllData, getDataById, deleteData, postData, updateData };
