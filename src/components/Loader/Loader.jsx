import React, { useEffect, useState } from 'react';
import './Loader.scss';

// assets
import loader from '../../assets/images/loader.svg';

// utils
import selectLoadingText from '../../utils/selectLoadingText';

const Loader = () => {
	const [loadingText, setLoadingText] = useState('Loading .');

	useEffect(() => {
		const loadingTimer = setInterval(() => {
			setLoadingText((prev) => selectLoadingText(prev));
		}, 500);

		return () => clearInterval(loadingTimer);
	}, []);
	return (
		<div className='loading-container'>
			<img src={loader} alt='loading...' />
			<p>{loadingText} </p>
		</div>
	);
};

export default Loader;
