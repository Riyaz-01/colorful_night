import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 3 };

const livesSlice = createSlice({
	name: 'lives',
	initialState,
	reducers: {
		decreaseLives(state) {
			state.value--;
		},
		resetLives(state) {
			state = initialState;
		},
	},
});

export const { decreaseLives, resetLives } = livesSlice.actions;
export default livesSlice.reducer;
