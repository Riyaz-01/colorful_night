import { useEffect, useState } from 'react';

// css
import './App.scss';

// libs
import * as handPoseDetection from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';

// components
import Stars from './components/Stars/Stars.jsx';
import Loader from './components/Loader/Loader.jsx';
import Intro from './components/Intro/Intro.jsx';
import Gameplay from './components/Gameplay/Gameplay.jsx';
import Handposes from './components/Handposes/Handposes.jsx';
import Stopwatch from './components/Stopwatch/Stopwatch.jsx';

function App() {
	const [loading, setLoading] = useState(false);

	const [isGameRunning, setIsGameRunning] = useState(false);
	const [net, setNet] = useState(null);

	const startGame = () => {
		setIsGameRunning(true);
	};

	const runHandPose = async () => {
		try {
			setLoading(true);
			const loadedNet = await handPoseDetection.load();
			setNet(loadedNet);
		} catch (error) {
			console.error('Failed to load handpose model:', error);
			// Optionally set an error state
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// runHandPose();
		startGame(); // starting for testing
	}, []);

	return (
		<div id='app'>
			{loading ? (
				<Loader />
			) : (
				<div id='main'>
					<Stars numberOfStars={30} minSize={1} maxSize={3} />
					{/* <Intro startGame={startGame} /> */}
					{isGameRunning && <Gameplay net={net} />}
				</div>
			)}
		</div>
	);
}

export default App;
