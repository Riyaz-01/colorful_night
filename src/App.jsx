import { useEffect, useState } from 'react';

// css
import './App.scss';

// libs
import * as handPoseDetection from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';

// redux
import { useSelector } from 'react-redux';

// components
import Stars from './components/Stars/Stars.jsx';
import Loader from './components/Loader/Loader.jsx';
import Intro from './components/Intro/Intro.jsx';
import Gameplay from './components/Gameplay/Gameplay.jsx';
import Gameover from './components/Gameover/Gameover.jsx';

function App() {
	const [loading, setLoading] = useState(false);
	const [net, setNet] = useState(null);
	const [startIntro, setStartIntro] = useState(true);

	const gameover = useSelector((state) => state.gameover.value);
	const score = useSelector((state) => state.score.value);

	const runHandPose = async () => {
		try {
			setLoading(true);
			const loadedNet = await handPoseDetection.load();
			setNet(loadedNet);
		} catch (error) {
			console.error('Failed to load handpose model:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		runHandPose();
	}, []);

	return (
		<div id='app'>
			{loading ? (
				<Loader />
			) : (
				<div id='main'>
					<Stars numberOfStars={30} minSize={1} maxSize={3} />
					{/* <Intro startIntro={startIntro} onEnd={() => setStartIntro(false)} /> */}
					{/* {!gameover && <Gameplay net={net} />} */}
					{/* {gameover && !startIntro && <Gameover score={score} />} */}
					<Gameplay net={net} />
				</div>
			)}
		</div>
	);
}

export default App;
