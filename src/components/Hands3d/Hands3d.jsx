import React, { useEffect, useRef } from 'react';

// libs
import Webcam from 'react-webcam';

// utils
import useAnimationFrame from '../../utils/useRequestAnimationFrame';
import detectGesture from '../../utils/detectGesture';
import drawhands from '../../utils/drawHands.js';
import { handposeIds } from '../../utils/handposes.js';

const Hands3d = ({
	net = {},
	shouldDetect = false,
	currentHandpose = '',
	handlehHandposeDetected = () => {},
	setHandVisible = () => {},
}) => {
	const currentHandposeRef = useRef(currentHandpose);
	const shouldDetectRef = useRef(false);
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
	useAnimationFrame({
		nextAnimationFrameHandler: async () => {
			const { canvas, video } = settingCanvasAndVideo();
			if (!canvas || !video) return; // Guard against missing elements

			const hands = await net.estimateHands(video, true);
			setHandVisible(hands.length > 0);
			drawhands(canvas, hands);

			// Refs used instead of state to avoid stale closures in the continuous requestAnimationFrame loop, ensuring latest values without restarting animation.
			const detect = shouldDetectRef.current;
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
	}, [currentHandpose]);
	return (
		<div className='hands3d'>
			<Webcam mirrored={true} ref={camRef} style={{ width: 0, height: 0 }} />
			<canvas id='hands-container' ref={canvasRef} />
		</div>
	);
};

export default Hands3d;
