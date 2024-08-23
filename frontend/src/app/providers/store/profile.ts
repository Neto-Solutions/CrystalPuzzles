import { createSlice } from '@reduxjs/toolkit';
import { Profile } from '@entities';
import { Auth } from '@api';

const [profile, err] = await Auth.getProfile();

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		profile: err ? new Profile() : new Profile(profile)
	},
	reducers: {
		setProfile: (state, action) => {
			state.profile = action.payload;
		}
	}
});

const selectProfile = (state: any) => state.profile.profile;

const { setProfile } = profileSlice.actions;

export { profileSlice, setProfile, selectProfile };
