import { configureStore } from '@reduxjs/toolkit';
import detectReducer from './redux/detectSlice.js';
import livesReducer from './redux/livesSlice.js';
import scoreReducer from './redux/scoreSlice.js';
import gameoverReducer from './redux/gameoverSlice.js';

export const store = configureStore({
	reducer: {
		gameover: gameoverReducer,
		shouldDetect: detectReducer,
		lives: livesReducer,
		score: scoreReducer,
	},
});
