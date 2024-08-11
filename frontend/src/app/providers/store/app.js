import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
	name: 'app',
	initialState: {
		header: 'Главная страница'
	},
	reducers: {
		setHeader(state, action) {
			state.header = action.payload;
		}
	}
});

const selectHeader = (state) => state.app.header;

const { setHeader } = appSlice.actions;

export { appSlice };
export { selectHeader };
export { setHeader };
