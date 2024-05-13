import { createSlice } from '@reduxjs/toolkit';
import User from './';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: new User({
			name: localStorage.getItem('name'),
			avatar: localStorage.getItem('avatar'),
			role: localStorage.getItem('role')
		})
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			//Temporary
			localStorage.setItem('name', action.payload.name);
			localStorage.setItem('avatar', action.payload.avatar);
			localStorage.setItem('role', action.payload.role);
		}
	}
});

export const selectUser = (state) => state.user.user;
export const { setUser } = userSlice.actions;
export default userSlice;
