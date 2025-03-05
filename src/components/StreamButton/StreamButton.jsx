import React from 'react';
import './StreamButton.scss';

const StreamButton = ({ onClick, children }) => {
	return (
		<button className='stream-button' onClick={onClick}>
			{children}
		</button>
	);
};

export default StreamButton;
