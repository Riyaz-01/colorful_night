import React from 'react';
import './ScoreLives.scss';

// assets
import heartIcon from '../../assets/images/heart-icon.png';

const ScoreLives = ({ score = 0, lives = 0 }) => {
	return (
		<div id='score-lives'>
			<div id='lives' className='status'>
				{[...Array(lives)].map(() => (
					<img src={heartIcon} alt='heart' />
				))}
			</div>
			<div id='score' className='status'>
				{score} pts.
			</div>
		</div>
	);
};

export default ScoreLives;
