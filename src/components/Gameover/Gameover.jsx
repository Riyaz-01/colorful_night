import React, { useEffect, useRef } from 'react';
import './Gameover.scss';

// assets
import gameoverAudio from '../../assets/sounds/game-over.mp3';

// components
import NameInput from '../NameInput/NameInput';

const Gameover = ({ score = 0 }) => {
	const gameoverAudioRef = useRef({});

	useEffect(() => {
		gameoverAudioRef.current.play();
	}, []);
	return (
		<div id='gameover' className='appear1'>
			<p>Game Over</p>
			<div
				className='score'
				title={`Score : ${score}`}
			>{`Score : ${score}`}</div>
			<NameInput />
			<audio src={gameoverAudio} ref={gameoverAudioRef} id='gameover' />
		</div>
	);
};

export default Gameover;
