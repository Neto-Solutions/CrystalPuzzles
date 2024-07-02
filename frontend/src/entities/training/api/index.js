import { $authHost } from '@shared/api/axios.instances';

const createTraining = async (name, description) => {
	const { data } = $authHost.post('/training', { name, description });
	return data;
};

const getTraining = async (id) => {
	const { data } = await $authHost.get(`/training/${id}`);
	return data;
};

const getAllTrainings = async ({ page, page_size, search_string = '' }) => {
	const { data } = await $authHost.get(`/training`, {
		page,
		page_size,
		search_string
	});
	return data;
};

const updateTraining = async (id, name, description) => {
	const { data } = $authHost.put(`/training`, { id, name, description });
	return data;
};

const deleteTraining = async (id) => {
	const { data } = $authHost.delete(`/training/remove/${id}`);
	return data;
};

export {
	createTraining,
	getTraining,
	getAllTrainings,
	updateTraining,
	deleteTraining
};
