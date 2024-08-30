import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
	name: 'app',
	initialState: {
		header: 'Главная страница',
		place: null,
		student: null,
		trainer: null
	},
	reducers: {
		setHeader(state, action) {
			state.header = action.payload;
		}
	}
});

const selectHeader = (state: any) => state.app.header;

const { setHeader } = appSlice.actions;

export { appSlice };
export { selectHeader };
export { setHeader };
