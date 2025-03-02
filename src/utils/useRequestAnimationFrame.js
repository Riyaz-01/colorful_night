import React from 'react';

const useAnimationFrame = ({
	nextAnimationFrameHandler = () => {},
	duration = Number.POSITIVE_INFINITY,
	shouldAnimate = true,
	frameRate = 30,
	shouldDetect = false, // Add shouldDetect as a parameter
}) => {
	const frame = React.useRef(0);
	const firstFrameTime = React.useRef(performance.now());
	const lastFrameTime = React.useRef(performance.now());

	const animate = async (now) => {
		try {
			const timeSinceLastFrame = now - lastFrameTime.current;
			const targetFrameTime = 1000 / frameRate;

			if (timeSinceLastFrame >= targetFrameTime) {
				let timeFraction = (now - firstFrameTime.current) / duration;
				if (timeFraction > 1) timeFraction = 1;

				// Pass the current shouldDetect value to the handler
				await nextAnimationFrameHandler(timeFraction, shouldDetect);
				lastFrameTime.current = now;
			}

			if (shouldAnimate) {
				frame.current = requestAnimationFrame(animate);
			}
		} catch (error) {
			console.error('Animation frame error:', error);
			if (shouldAnimate) {
				frame.current = requestAnimationFrame(animate);
			}
		}
	};

	React.useEffect(() => {
		if (shouldAnimate) {
			firstFrameTime.current = performance.now();
			lastFrameTime.current = performance.now();
			frame.current = requestAnimationFrame(animate);
		} else {
			cancelAnimationFrame(frame.current);
		}

		return () => cancelAnimationFrame(frame.current);
	}, [shouldAnimate, frameRate]);
};

export default useAnimationFrame;
