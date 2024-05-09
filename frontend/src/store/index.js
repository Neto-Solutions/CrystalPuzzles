import { configureStore } from '@reduxjs/toolkit';

const mainReducer = (
	prevState = {
		user: {}
	},
	action
) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_USER':
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
