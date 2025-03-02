import React, { useState, useEffect, useRef } from 'react';
import './Stopwatch.scss';

// assets
import errorSound from '../../assets/sounds/error.mp3';

const Stopwatch = ({
	duration = 3,
	r = 100,
	isRunning = false,
	setIsRunning = () => {},
	isCorrectHandpose = false,
	handleTimeover = () => {},
	reset = () => {},
}) => {
	const [timeLeft, setTimeLeft] = useState(duration);
	const [isResetting, setIsResetting] = useState(false);
	const [timeover, setTimeover] = useState(false);
	const audioRef = useRef(null);

	const resetTimer = () => {
		setIsResetting(true);
		setTimeLeft(duration);
		setTimeover(false);
		reset();
	};

	const triggerError = () => {
		setTimeover(true);
		audioRef.current.play();
		handleTimeover();
		setTimeout(() => {
			resetTimer();
		}, 500);
	};

	useEffect(() => {
		if (!isRunning) return;

		setIsResetting(false);
		let timer;
		if (timeLeft > 0) {
			setTimeLeft((prev) => prev - 1); // Immediate start
			timer = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						clearInterval(timer); // Stop the interval
						if (isRunning) {
							// Only trigger error if timer expired naturally
							setTimeout(() => {
								triggerError();
							}, 1000); // Delay error by 1s
						}
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}

		return () => clearInterval(timer);
	}, [isRunning]);

	useEffect(() => {
		if (isCorrectHandpose && isRunning) resetTimer();
	}, [isCorrectHandpose]);

	// Calculate the stroke dash offset for the outer circle
	const radius = r + 3;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset =
		circumference - (timeLeft / duration) * circumference;

	return (
		<div className={`stopwatch-container ${timeover ? 'error' : ''}`}>
			<svg width='200' height='200' className='stopwatch-svg'>
				{/* Inner static circle */}
				<circle
					cx='100'
					cy='100'
					r={`${r}`}
					fill='none'
					stroke={timeover ? '#ff6b6b' : '#e0e0e0'}
					strokeWidth={timeover ? 5 : 3}
				/>
				{/* Outer dynamic circle (arc) */}
				<circle
					cx='100'
					cy='100'
					r={radius}
					fill='none'
					stroke='#4CAF50' // Base color will be overridden by animation
					strokeWidth='4'
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					transform='rotate(-90 100 100)'
					className={`progress-circle smooth-glitch ${
						isResetting ? 'no-transition' : ''
					}`}
				/>
			</svg>
			<audio controls src={errorSound} ref={audioRef} id='error' />
		</div>
	);
};

export default Stopwatch;
