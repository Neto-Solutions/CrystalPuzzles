import { $authHost } from '.';

const addStudent = async (params) => {
	// const { student_id, group_id } = params;
	const { data } = await $authHost.post(`/group/add-student`, params);
	return data;
};
const removeStudent = async (params) => {
	// const { student_id, group_id } = params;
	const { data } = await $authHost.delete(`/group/delete-student`, params);
	return data;
};

export { addStudent, removeStudent };
