import { combineSlices, configureStore } from '@reduxjs/toolkit';
import userReducer from '@entities/User/slice';

const mainReducer = combineSlices(userReducer);

export default configureStore({
	reducer: mainReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});
