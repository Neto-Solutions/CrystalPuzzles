import { $authHost } from '../../../api';

const getProfile = async () => {
	let data = null;
	try {
		data = await $authHost.get('/profile');
	} catch (error) {
		data = error;
	}
	return data;
};

const getProfileEdit = async () => {
	const { data } = await $authHost.get('/profile/edit');
	return data;
};

const updateProfile = async (profile) => {
	const { firstname, lastname, surname, birthday, is_man, contact } = profile;
	const { data } = await $authHost.put('/profile/edit', {
		firstname,
		lastname,
		surname,
		birthday,
		is_man,
		contact
	});
	return data;
};

const updateProfileAvatar = async (avatar) => {
	// multipart/form-data
	const { data } = await $authHost.put('/profile/set-photo', avatar);
	return data;
};

const deleteProfileAvatar = async () => {
	const { data } = await $authHost.delete('/profile/set-photo');
	return data;
};

const getProfileAvatar = async () => {
	const { data } = await $authHost.get('/profile/get-photo');
	return data;
};

export {
	getProfile,
	getProfileEdit,
	updateProfile,
	updateProfileAvatar,
	deleteProfileAvatar,
	getProfileAvatar
};
