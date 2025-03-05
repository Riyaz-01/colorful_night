import React from 'react';
import './Gameover.scss';

// assets
import gameoverAudio from '../../assets/sounds/game-over.mp3';
import { useSelector } from 'react-redux';
import NameInput from '../NameInput/NameInput';

const Gameover = ({ audioRef = {} }) => {
	const score = useSelector((state) => state.score.value);
	return (
		<div id='gameover' className='appear1'>
			<p>Game Over</p>
			<div
				className='score'
				title={`Score : ${score}`}
			>{`Score : ${score}`}</div>
			<NameInput />
			<audio src={gameoverAudio} ref={audioRef} id='gameover' />
		</div>
	);
};

export default Gameover;
