import { createSlice } from '@reduxjs/toolkit';
import { User } from '@entities/user';

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
const selectUser = (state) => state.user.user;
const { setUser } = userSlice.actions;

export { userSlice, setUser, selectUser };
