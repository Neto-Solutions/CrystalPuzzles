import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
	name: 'app',
	initialState: {
		rewards: [],
		lessons: [],
		users: []
	},
	reducers: {
		setRewards(state, action) {
			state.rewards = action.payload;
		},
		setLessons(state, action) {
			state.lessons = action.payload;
		},
		setUsers(state, action) {
			state.users = action.payload;
		}
	}
});

const selectRewards = (state) => state.app.rewards;
const selectLessons = (state) => state.app.lessons;
const selectUsers = (state) => state.app.users;

const { setRewards, setLessons, setUsers } = appSlice.actions;

export { appSlice };
export { selectRewards, selectLessons, selectUsers };
export { setRewards, setLessons, setUsers };
