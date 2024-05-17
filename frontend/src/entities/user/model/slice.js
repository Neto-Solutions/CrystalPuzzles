import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: { role: null }
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		}
	}
});
const selectUser = (state) => state.user.user;
const { setUser } = userSlice.actions;

export { userSlice, setUser, selectUser };
