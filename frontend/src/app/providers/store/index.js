import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@entities/user';
import { appSlice } from './app';

const mainReducer = combineSlices(userSlice, appSlice);

const store = configureStore({
	reducer: mainReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export default store;
