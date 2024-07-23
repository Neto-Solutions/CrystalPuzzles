import { $authHost } from '@shared/api/axios.instances';
const deleteDevice = async (group_id) => {
	const { data } = await $authHost.delete(`/group/remove/${group_id}`);
	return data;
};
export { deleteDevice };
