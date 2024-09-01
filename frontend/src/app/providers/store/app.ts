import { createSlice } from '@reduxjs/toolkit';
import Place from '@shared/api/place';

const appSlice = createSlice({
	name: 'app',
	initialState: {
		header: 'Главная страница',
		places: null,
		students: null,
		trainers: null
	},
	reducers: {
		setHeader(state, action) {
			state.header = action.payload;
		},
		updatePlace(state, action) {
			// TODO: написать запрос на сервер получить places, посмотреть как сделано в profile.ts
			// Place.get().then;
			//(shared/api/place)
		}
	}
});

const selectHeader = (state: any) => state.app.header;

const { setHeader } = appSlice.actions;

export { appSlice };
export { selectHeader };
export { setHeader };
