import React, { useEffect, useRef, useState } from 'react';
import './Gameplay.scss';

// libs
import Webcam from 'react-webcam';

// assets
import detectSuccessAudio from '../../assets/sounds/detectSuccess.mp3';

// utils
import useAnimationFrame from '../../utils/useRequestAnimationFrame';
import detectGesture from '../../utils/detectGesture';
import drawhands from '../../utils/drawHands.js';
import { handposeIds } from '../../utils/handposes.js';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { stopDetect } from '../../redux/detectSlice.js';
import { decreaseLives } from '../../redux/livesSlice.js';
import { increaseScore } from '../../redux/scoreSlice.js';

// components
import Handposes from '../Handposes/Handposes.jsx';

const Gameplay = ({ net = {} }) => {
	const duration = 3;
	const successAudioRef = useRef(null);
	const [handVisible, setHandVisible] = useState(false);
	const [currentHandpose, setCurrentHandpose] = useState(() => false);
	const [isCorrectHandpose, setIsCorrectHandpose] = useState(false);

	const shouldDetect = useSelector((state) => state.shouldDetect.value);
	const score = useSelector((state) => state.score.value);
	const lives = useSelector((state) => state.lives.value);
	const dispatch = useDispatch();

	const camRef = useRef(null);
	const canvasRef = useRef(null);

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

	const handlehHandposeDetected = () => {
		dispatch(stopDetect());
		setIsCorrectHandpose(true);
		successAudioRef.current.play();
		dispatch(increaseScore());
	};

	const handleTimeover = () => {
		dispatch(stopDetect());
		dispatch(decreaseLives());
	};

	useAnimationFrame({
		nextAnimationFrameHandler: async () => {
			const { canvas, video } = settingCanvasAndVideo();
			if (!canvas || !video) return; // Guard against missing elements

			const hands = await net.estimateHands(video, true);
			setHandVisible(hands.length > 0);
			drawhands(canvas, hands);

			if (!shouldDetect) return;
			const gestures = detectGesture(hands);
			console.log(gestures);
			if (gestures?.includes(handposeIds[currentHandpose]))
				handlehHandposeDetected();
		},
		shouldAnimate: shouldDetect,
		frameRate: 20,
	});

	return (
		<div id='gameplay'>
			<Instructions handVisible={handVisible} />
			<Handposes
				currentHandpose={currentHandpose}
				setCurrentHandpose={setCurrentHandpose}
				isCorrectHandpose={isCorrectHandpose}
				setIsCorrectHandpose={setIsCorrectHandpose}
				handVisible={handVisible}
				duration={duration}
				handleTimeover={handleTimeover}
			/>
			<Webcam mirrored={true} ref={camRef} style={{ width: 0, height: 0 }} />
			<canvas id='hands-container' ref={canvasRef} />
			<audio
				controls
				src={detectSuccessAudio}
				ref={successAudioRef}
				id='error'
			/>
		</div>
	);
};

export default Gameplay;

const Instructions = ({ handVisible = false }) => {
	if (!handVisible)
		return (
			<div id='instructions'>
				<>
					<p className='ins1 appear2'>
						Place your hand in front of the camera and hold the position until
						it appears.
					</p>
					<p className='ins2 appear2'>
						Please be patient, detection can take a few moments.
					</p>
				</>
			</div>
		);
};
