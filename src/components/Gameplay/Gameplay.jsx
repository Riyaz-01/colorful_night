import React from 'react';
import './Gameplay.scss';

const Gameplay = ({ handVisible = false }) => {
	return <div id='gameplay'>{!handVisible && <Instructions />}</div>;
};

export default Gameplay;

const Instructions = () => {
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
