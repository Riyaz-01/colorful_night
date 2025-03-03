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

	const [showCanvas, setShowCanvas] = useState(false);
	const [net, setNet] = useState(null);

	const startGame = () => {
		setShowCanvas(true);
	};

	const runHandPose = async () => {
		setLoading(true);
		console.log('handpose model is loading...');
		const net = await handPoseDetection.load();
		console.log('handpose model loaded');
		setLoading(false);
		setNet(net);
	};

	useEffect(() => {
		runHandPose();
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
					{showCanvas && <Gameplay net={net} />}
				</div>
			)}
		</div>
	);
}

export default App;
