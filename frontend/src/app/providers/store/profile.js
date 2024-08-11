import { createSlice } from '@reduxjs/toolkit';
import { Profile } from '@entities/profile';
import LS from '@shared/lib/localStorage';

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		profile: LS.get('profile') || new Profile()
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
