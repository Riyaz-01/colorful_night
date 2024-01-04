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
import selectLoadingText from './utils/selectLoadingText';

// assets
import loader from './assets/loader.svg';

// components
import Stars from './components/Stars/Stars.jsx';

function App() {
	const [loading, setLoading] = useState(false);
	const [loadingText, setLoadingText] = useState('Loading .');
	const camRef = useRef(null);
	const canvasRef = useRef(null);
	const [shouldAnimate, setShouldAnimate] = useState(false);
	const [net, setNet] = useState(null);

	useAnimationFrame({
		nextAnimationFrameHandler: async () => {
			const { canvas, video } = settingCanvasAndVideo();
			const hands = await net.estimateHands(video, true);
			drawhands(canvas, hands);
			detectGesture(hands);
		},
		shouldAnimate: shouldAnimate && !loading,
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

		const loadingTimer = setInterval(() => {
			setLoadingText((prev) => selectLoadingText(prev));
		}, 500);

		console.log('handpose model is loading...');
		const net = await handPoseDetection.load();
		console.log('handpose model loaded');

		clearInterval(loadingTimer);
		setLoading(false);

		setNet(net);
		setShouldAnimate(true);
	};

	useEffect(() => {
		// runHandPose();
	}, []);

	return (
		<div id='app'>
			{loading ? (
				<div className='loading-container'>
					<img src={loader} alt='loading...' />
					<p>{loadingText} </p>
				</div>
			) : (
				<div id='main'>
					<Stars />
					<Webcam
						mirrored={true}
						ref={camRef}
						style={{ width: 0, height: 0 }}
					/>
					<canvas id='hands-container' ref={canvasRef} />

					<div id='intro'></div>
				</div>
			)}
		</div>
	);
}

export default App;
