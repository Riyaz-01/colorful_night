import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: true };

const gameoverSlice = createSlice({
	name: 'gameover',
	initialState,
	reducers: {
		endGame(state) {
			state.value = true;
		},
		startGame(state) {
			state.value = false;
		},
	},
});

export const { startGame, endGame } = gameoverSlice.actions;
export default gameoverSlice.reducer;
