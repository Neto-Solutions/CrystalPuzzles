import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { profileSlice } from '@store/profile';
import { appSlice } from './app';

const mainReducer = combineSlices(profileSlice, appSlice);

const store = configureStore({
	reducer: mainReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export default store;
