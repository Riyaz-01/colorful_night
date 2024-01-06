import React, { useState } from 'react';
import './Button.scss';

const Button = ({
	children = <></>,
	onClick = () => {},
	delay = 500,
	...props
}) => {
	const [animate, setAnimate] = useState(false);
	const handleClick = () => {
		setAnimate(true);
		setTimeout(() => {
			onClick();
			setAnimate(false);
		}, delay);
	};
	return (
		<div className='btn-cont' {...props} onClick={handleClick}>
			<button className={'custom-button btn ' + (animate && 'fade')}>
				{children}
			</button>
		</div>
	);
};

export default Button;
