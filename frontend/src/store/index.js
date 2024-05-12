import { configureStore } from '@reduxjs/toolkit';
import User from '../entities/User';

const mainReducer = (
	prevState = {
		user:
			new User({
				name: localStorage.getItem('name'),
				avatar: localStorage.getItem('avatar'),
				role: localStorage.getItem('role')
			}) || {}
	},
	action
) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_USER':
			localStorage.setItem('name', payload.name);
			localStorage.setItem('avatar', payload.avatar);
			localStorage.setItem('role', payload.role);
			return {
				...prevState,
				user: payload
			};
		default:
			return prevState;
	}
};

export default configureStore({
	reducer: mainReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});
