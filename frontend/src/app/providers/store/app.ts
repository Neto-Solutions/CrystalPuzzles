import { createSlice } from '@reduxjs/toolkit';
// import Place from '@shared/api/place';

interface AppState {
	header: string;
	places: any[] | null;
	students: any[] | null;
	trainers: any[] | null;
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
		setPlaces(state, action) {
			state.places = action.payload;
		},
		setStudents(state, action) {
			state.students = action.payload;
		},
		setTrainers(state, action) {
			state.trainers = action.payload;
		}
	}
});

const selectHeader = (state: any) => state.app.header;

const { setHeader, setPlaces } = appSlice.actions;
export { appSlice, setHeader, setPlaces, selectHeader };
