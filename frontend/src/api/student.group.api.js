import { $authHost } from '.';

const addStudent = async (params) => {
	const { student_id, group_id } = params;
	const { data } = await $authHost.post(`/group/add-student`, {
		student_id,
		group_id
	});
	return data;
};
const removeStudent = async (params) => {
	const { student_id, group_id } = params;
	const { data } = await $authHost.delete(`/group/delete-student`, {
		student_id,
		group_id
	});
	return data;
};

export { addStudent, removeStudent };
