import { useEffect, useRef, useState } from 'react';

// css
import './App.scss';

// libs
import * as handPoseDetection from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from 'react-webcam';

// utils
import useAnimationFrame from './utils/useRequestAnimationFrame';
import detectGesture from './utils/detectGesture';
import drawhands from './utils/drawHands.js';

// components
import Stars from './components/Stars/Stars.jsx';
import Loader from './components/Loader/Loader.jsx';
import Intro from './components/Intro/Intro.jsx';
import Gameplay from './components/Gameplay/Gameplay.jsx';

function App() {
	const [loading, setLoading] = useState(false);

	const camRef = useRef(null);
	const canvasRef = useRef(null);
	const [shouldAnimate, setShouldAnimate] = useState(false);
	const [net, setNet] = useState(null);
	const [showCanvas, setShowCanvas] = useState(false);
	const [handVisible, setHandVisible] = useState(false);
	const [running, setRunning] = useState(false);

	const startGame = () => {
		setRunning(true);
	};

	useAnimationFrame({
		nextAnimationFrameHandler: async () => {
			const { canvas, video } = settingCanvasAndVideo();
			const hands = await net.estimateHands(video, true);

			if (hands.length == 0) setHandVisible(false);
			else setHandVisible(true);

			drawhands(canvas, hands);
			detectGesture(hands);
		},
		shouldAnimate: shouldAnimate && !loading && showCanvas,
	});

	const settingCanvasAndVideo = () => {
		if (
			typeof camRef.current === 'undefined' &&
			camRef.current === null &&
			!camRef.current.video.readyState
		) {
			console.error('Video not detected !!');
			return;
		}
		const video = camRef.current.video;
		const canvas = canvasRef.current;

		// Get Video Properties
		const videoWidth = video.videoWidth;
		const videoHeight = video.videoHeight;

		// Set video width
		video.width = videoWidth;
		video.Height = videoHeight;

		// Set canvas width
		canvas.width = videoWidth;
		canvas.height = videoHeight;

		return { video, canvas };
	};

	const runHandPose = async () => {
		setLoading(true);
		console.log('handpose model is loading...');
		const net = await handPoseDetection.load();
		console.log('handpose model loaded');
		setLoading(false);

		setNet(net);
		setShouldAnimate(true);
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
					<Stars />
					<Intro setShowCanvas={setShowCanvas} startGame={startGame} />
					{showCanvas && (
						<>
							<Webcam
								mirrored={true}
								ref={camRef}
								style={{ width: 0, height: 0 }}
							/>
							<canvas id='hands-container' ref={canvasRef} />
						</>
					)}
					{running && <Gameplay handVisible={handVisible} />}
				</div>
			)}
		</div>
	);
}

export default App;
