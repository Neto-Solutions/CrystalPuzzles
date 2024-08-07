import { createSlice } from '@reduxjs/toolkit';
import { Profile } from '@entities/profile';

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		profile: new Profile()
	},
	reducers: {
		setProfile: (state, action) => {
			state.profile = action.payload;
		}
	}
});

const selectProfile = (state) => state.profile.profile;

const { setProfile } = profileSlice.actions;

export { profileSlice, setProfile, selectProfile };
