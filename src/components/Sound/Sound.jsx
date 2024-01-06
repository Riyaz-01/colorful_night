import React, { useEffect, useRef, useState } from 'react';
import './Sound.scss';

// assets
import soundOn from '../../assets/images/sound-on.svg';
import soundOff from '../../assets/images/sound-off.svg';
import next from '../../assets/images/next.svg';
import sound1 from '../../assets/sounds/arcade-mode.mp3';
import sound2 from '../../assets/sounds/retro-soldiers.mp3';

const Sound = ({ isPlaying, setIsPlaying, ...props }) => {
	const [soundIndex, setSoundIndex] = useState(0);
	const audioRef = useRef(null);

	const playSound = () => {
		audioRef.current.play();
		setIsPlaying(true);
	};
	const pauseSound = () => {
		audioRef.current.pause();
		setIsPlaying(false);
	};

	const playPause = () => {
		if (isPlaying) playSound();
		else pauseSound();
	};

	const handleToggle = () => {
		if (isPlaying) setIsPlaying(false);
		else setIsPlaying(true);
	};

	const handleSoundChange = async () => {
		let index = soundIndex;
		index++;
		if (index >= sounds.length) index = 0;

		await setSoundIndex(index);
		playSound();
	};

	useEffect(() => {
		playPause();
	}, [isPlaying]);

	return (
		<div id='sound-container'>
			<button id='sound-toggle' className='sound-btn' onClick={handleToggle}>
				<img src={isPlaying ? soundOn : soundOff} alt='sound' />
			</button>
			<button id='next' className='sound-btn' onClick={handleSoundChange}>
				<img src={next} alt='next' />
			</button>

			<audio
				controls
				src={sounds[soundIndex]}
				loop
				ref={audioRef}
				autoPlay
				id='bgm'
			/>
		</div>
	);
};

export default Sound;

const sounds = [sound1, sound2];
