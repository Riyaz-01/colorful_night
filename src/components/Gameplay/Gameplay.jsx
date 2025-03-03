import React, { useEffect, useRef, useState } from 'react';
import './Gameplay.scss';

// assets
import detectSuccessAudio from '../../assets/sounds/detectSuccess.mp3';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { stopDetect } from '../../redux/detectSlice.js';
import { decreaseLives } from '../../redux/livesSlice.js';
import { increaseScore } from '../../redux/scoreSlice.js';

// components
import Handposes from '../Handposes/Handposes.jsx';
import Hands3d from '../Hands3d/Hands3d.jsx';

const Gameplay = ({ net = {} }) => {
	const duration = 3;
	const successAudioRef = useRef(null);
	const [handVisible, setHandVisible] = useState(false);
	const [currentHandpose, setCurrentHandpose] = useState(() => false);

	const [isCorrectHandpose, setIsCorrectHandpose] = useState(false);
	const detectionCooldown = useRef(false); // Debounce detection

	const shouldDetect = useSelector((state) => state.shouldDetect.value);

	const score = useSelector((state) => state.score.value);
	const lives = useSelector((state) => state.lives.value);
	const dispatch = useDispatch();

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
			<Hands3d
				net={net}
				shouldDetect={shouldDetect}
				currentHandpose={currentHandpose}
				handlehHandposeDetected={handlehHandposeDetected}
				setHandVisible={setHandVisible}
			/>
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
				<p className='ins1 appear2'>
					Place your hand in front of the camera and hold the position until it
					appears.
				</p>
				<p className='ins2 appear2'>
					Please be patient, detection can take a few moments.
				</p>
			</div>
		);
};
