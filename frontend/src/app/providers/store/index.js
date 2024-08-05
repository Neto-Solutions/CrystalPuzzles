import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@entities/user';

const mainReducer = combineSlices(userSlice);

const store = configureStore({
	reducer: mainReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export default store;
