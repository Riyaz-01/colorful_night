import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: false };

const gameRunningSlice = createSlice({
	name: 'isGameRunning',
	initialState,
	reducers: {
		startGame(state) {
			state.value = true;
		},
		endGame(state) {
			state.value = false;
		},
	},
});

export const { startGame, endGame } = gameRunningSlice.actions;
export default gameRunningSlice.reducer;
