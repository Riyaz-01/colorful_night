import React, { useRef, useState } from 'react';
import './Button.scss';

import clickSound from '../../assets/sounds/click.mp3';

const Button = ({
	children = <></>,
	onClick = () => {},
	delay = 500,
	...props
}) => {
	const [animate, setAnimate] = useState(false);
	const audioRef = useRef(null);

	const handleClick = () => {
		setAnimate(true);
		audioRef.current.play();
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

			<audio controls src={clickSound} ref={audioRef} id='click' />
		</div>
	);
};

export default Button;
