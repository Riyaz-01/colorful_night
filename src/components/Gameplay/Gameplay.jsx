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
	const currentHandposeRef = useRef(currentHandpose);
	const [isCorrectHandpose, setIsCorrectHandpose] = useState(false);
	const detectionCooldown = useRef(false); // Debounce detection

	const shouldDetect = useSelector((state) => state.shouldDetect.value);
	const shouldDetectRef = useRef(false);
	const score = useSelector((state) => state.score.value);
	const lives = useSelector((state) => state.lives.value);
	const dispatch = useDispatch();

	const camRef = useRef(null);
	const canvasRef = useRef(null);

	const settingCanvasAndVideo = () => {
		if (
			!camRef.current ||
			!camRef.current.video ||
			camRef.current.video.readyState < 2 // Ensure video has data
		) {
			return { canvas: null, video: null };
		}
		const video = camRef.current.video;
		const canvas = canvasRef.current;

		const videoWidth = video.videoWidth;
		const videoHeight = video.videoHeight;

		if (videoWidth === 0 || videoHeight === 0) {
			return { canvas: null, video: null };
		}

		video.width = videoWidth;
		video.height = videoHeight;
		canvas.width = videoWidth;
		canvas.height = videoHeight;

		return { video, canvas };
	};

	const handlehHandposeDetected = () => {
		if (detectionCooldown.current) return; // Prevent multiple triggers
		detectionCooldown.current = true;

		dispatch(stopDetect());
		setIsCorrectHandpose(true);
		successAudioRef.current.play();
		dispatch(increaseScore());

		setTimeout(() => {
			detectionCooldown.current = false; // Reset cooldown after delay
		}, 2500); // Match reset + climb delay in Handposes
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

			const detect = shouldDetectRef.current; // Use ref for current value
			if (!detect) return;

			const gestures = detectGesture(hands);
			const currentPose = currentHandposeRef.current;
			if (gestures?.includes(handposeIds[currentPose])) {
				handlehHandposeDetected();
			}
		},
		shouldAnimate: true,
		shouldDetect: shouldDetect,
		frameRate: 20,
	});

	// Sync refs with state
	useEffect(() => {
		shouldDetectRef.current = shouldDetect;
	}, [shouldDetect]);
	useEffect(() => {
		currentHandposeRef.current = currentHandpose;
		console.log('Updated currentHandposeRef:', currentHandposeRef.current);
	}, [currentHandpose]);

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
