import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

const scoreSlice = createSlice({
	name: 'score',
	initialState,
	reducers: {
		increaseScore(state) {
			state.value += 100;
		},
		resetScore(state) {
			state = initialState;
		},
	},
});

export const { increaseScore, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
