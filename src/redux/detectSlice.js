import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: false };

const detectSlice = createSlice({
	name: 'shouldDetect',
	initialState,
	reducers: {
		startDetect(state) {
			state.value = true;
		},
		stopDetect(state) {
			state.value = false;
		},
	},
});

export const { startDetect, stopDetect } = detectSlice.actions;
export default detectSlice.reducer;
