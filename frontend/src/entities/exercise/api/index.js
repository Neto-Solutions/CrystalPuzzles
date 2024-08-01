import { $authHost } from '@shared/api/axios.instances';

const getExercises = async () => {
	const { data } = await $authHost.get(`/exercise`);
	return data;
};

export { getExercises };
