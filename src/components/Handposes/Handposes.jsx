import React, { useEffect, useState } from 'react';
import './Handposes.scss';

// utils
import { getRandomPoseIcon } from '../../utils/handposes';

// redux
import { useDispatch } from 'react-redux';
import { startDetect, stopDetect } from '../../redux/detectSlice.js';

// components
import Stopwatch from '../Stopwatch/Stopwatch';

const Handposes = ({
	duration = 3,
	currentHandpose = '',
	setCurrentHandpose = () => {},
	isCorrectHandpose = false,
	setIsCorrectHandpose = () => {},
	handleTimeover = () => {},
	// handVisible = false,
}) => {
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [climb, setClimb] = useState(false);

	const dispatch = useDispatch();

	const reset = () => {
		setClimb(false);
		setIsTimerRunning(false);
		setCurrentHandpose(() => getRandomPoseIcon());
		setIsCorrectHandpose(false);
		dispatch(stopDetect());

		// if (handVisible)
		setTimeout(() => {
			startTimer();
		}, 500);
	};

	const startTimer = () => {
		setClimb(true);
		setTimeout(() => {
			setIsTimerRunning(true);
			dispatch(startDetect());
		}, 2000); // 2000 is the climing time of the handpose circle
	};

	useEffect(() => {
		if (isCorrectHandpose) {
			reset();
		}
	}, [isCorrectHandpose]);

	useEffect(() => {
		reset();
	}, []);

	return (
		<div id='handposes'>
			<Stopwatch
				isRunning={isTimerRunning}
				setIsRunning={setIsTimerRunning}
				isCorrectHandpose={isCorrectHandpose}
				duration={duration}
				reset={reset}
				handleTimeover={handleTimeover}
			/>
			{climb && (
				<svg id='handpose' width='200' height='200' className={'animate'}>
					<circle
						cx='100'
						cy='100'
						r={`${60}`}
						fill='none'
						stroke='#e0e0e0'
						strokeWidth='3'
					/>
					<text x='100' y='100' textAnchor='middle' dy='.3em'>
						{currentHandpose}
					</text>
				</svg>
			)}
		</div>
	);
};

export default Handposes;
