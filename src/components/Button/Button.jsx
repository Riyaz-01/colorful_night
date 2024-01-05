import React from 'react';
import './Button.scss';

const Button = ({ children = <></> }) => {
	return (
		<div className='btn-cont'>
			<button className='custom-button btn'>
				{children}
				<span class='line-1'></span>
				<span class='line-2'></span>
				<span class='line-3'></span>
				<span class='line-4'></span>
			</button>
		</div>
	);
};

export default Button;
