import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { profileSlice } from './profile';
import { appSlice } from './app';

const mainReducer = combineSlices(profileSlice, appSlice);

const store = configureStore({
	reducer: mainReducer,
	middleware: (getDefaultMiddleware: any) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export default store;
