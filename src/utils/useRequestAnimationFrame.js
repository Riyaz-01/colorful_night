import React from 'react';

const useAnimationFrame = ({
	nextAnimationFrameHandler = () => {},
	duration = Number.POSITIVE_INFINITY,
	shouldAnimate = true,
	frameRate = 30, // Default to 30 FPS to reduce load
}) => {
	const frame = React.useRef(0);
	const firstFrameTime = React.useRef(performance.now());
	const lastFrameTime = React.useRef(performance.now());

	const animate = async (now) => {
		const timeSinceLastFrame = now - lastFrameTime.current;
		const targetFrameTime = 1000 / frameRate; // e.g., 33.33ms for 30 FPS

		if (timeSinceLastFrame >= targetFrameTime) {
			let timeFraction = (now - firstFrameTime.current) / duration;
			if (timeFraction > 1) timeFraction = 1;

			if (timeFraction <= 1) {
				await nextAnimationFrameHandler(timeFraction); // Handle async gracefully
				lastFrameTime.current = now;
				if (timeFraction !== 1) frame.current = requestAnimationFrame(animate);
			}
		} else {
			frame.current = requestAnimationFrame(animate); // Skip frame if too soon
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
	}, [shouldAnimate, frameRate]); // Add frameRate to dependencies if dynamic
};

export default useAnimationFrame;
