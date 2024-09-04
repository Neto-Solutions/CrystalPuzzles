import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Place from '@shared/api/place';

interface AppState {
	header: string;
	places: any;
	students: any;
	trainers: any;
}

const initialState: AppState = {
	header: 'Главная страница',
	places: null,
	students: null,
	trainers: null
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setHeader(state, action) {
			state.header = action.payload;
		},
		setPlace(state, action) {
			state.places = action.payload;
		}
	}
});

export const fetchPlaces = createAsyncThunk(
	'app/fetchPlaces',
	async (_, { dispatch }) => {
		try {
			const places = await Place.get();
			dispatch(setPlace(places));
		} catch (error) {
			console.error(error);
		}
	}
);

const selectHeader = (state: any) => state.app.header;

const { setHeader, setPlace } = appSlice.actions;
export { appSlice, setHeader, setPlace, selectHeader };
