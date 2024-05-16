import { combineSlices, configureStore } from '@reduxjs/toolkit';
import userSlice from '../../../entities/user/model/slice';

const mainReducer = combineSlices(userSlice);

const store = configureStore({
	reducer: mainReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export { store };
export * from './slices/user';
