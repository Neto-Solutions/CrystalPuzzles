import { $authHost } from '@shared/api/axios.instances';

const createGroup = async (group) => {
	const { data } = await $authHost.post('/group', group);
	return data;
};

const getAllGroups = async () => {
	const { data } = await $authHost.get('/group');
	return data;
};

const getGroup = async (group_id) => {
	const { data } = await $authHost.get(`/group/${group_id}`);
	return data;
};

const updateGroup = async (group) => {
	const { id, name, trainer_id } = group;
	const { data } = await $authHost.put(`/group`, { id, name, trainer_id });
	return data;
};

const deleteGroup = async (group_id) => {
	const { data } = await $authHost.delete(`/group/${group_id}`);
	return data;
};

const addStudent = async (student_id, group_id) => {
	const { data } = await $authHost.post('/group/add-student', {
		student_id,
		group_id
	});
	return data;
};
const removeStudent = async (student_id, group_id) => {
	const { data } = await $authHost.post('/group/delete-student', {
		student_id,
		group_id
	});
	return data;
};

export {
	createGroup,
	getAllGroups,
	getGroup,
	updateGroup,
	deleteGroup,
	addStudent,
	removeStudent
};
