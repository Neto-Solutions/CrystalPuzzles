import { createSlice } from '@reduxjs/toolkit';
import User from './';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: new User({ role: null })
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		}
	}
});

export const selectUser = (state) => state.user.user;
export const { setUser } = userSlice.actions;
export default userSlice;
