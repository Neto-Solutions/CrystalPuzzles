import { $host, $authHost } from '.';

const getGroup = async (group_id) => {
	const { data } = await $authHost.get(`/group/${group_id}`);
	return data;
};

const deleteGroup = async (group_id) => {
	const { data } = await $authHost.delete(`/group/${group_id}`);
	return data;
};

const getAllGroups = async () => {
	const { data } = await $host.get('/group');
	return data;
};

const createGroup = async (group) => {
	const { data } = await $authHost.post('/group', group);
	return data;
};

const updateGroup = async (group) => {
	// const { id, name, trainer_id } = group;
	const { data } = await $authHost.put(`/group`, group);
	return data;
};

const deleteDevice = async (group_id) => {
	const { data } = await $authHost.delete(`/group/remove/${group_id}`);
	return data;
};

export {
	getGroup,
	deleteGroup,
	getAllGroups,
	createGroup,
	updateGroup,
	deleteDevice
};
