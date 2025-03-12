import React, { useEffect, useState } from 'react';
import './Intro.scss';

// assets
import tutorialVid from '../../assets/tutorial.mp4';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../../redux/gameoverSlice.js';

// components
import Button from '../Button/Button';
import Sound from '../Sound/Sound';

const Intro = ({ onEnd = () => {} }) => {
	const [animationIndex, setAnimationIndex] = useState(null);
	const [showDesc, setShowDesc] = useState(false);
	const [showTutVid, setShowTutVid] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const gameover = useSelector((state) => state.gameover.value);
	const dispatch = useDispatch();

	const handleClick1 = () => {
		setShowDesc(false);
		setShowTutVid(true);
		setIsPlaying(true);
	};

	const handleClick2 = () => {
		setAnimationIndex(2);
		setTimeout(() => {
			setShowTutVid(false);
			setAnimationIndex(1);
			onEnd();
			dispatch(startGame());
		}, 500);
	};

	const startAnimations = () => {
		setTimeout(() => setAnimationIndex(0), 1500);
		setTimeout(() => setAnimationIndex(1), 2000);
		setTimeout(() => setShowDesc(true), 3000);
	};

	useEffect(() => {
		startAnimations();
	}, []);

	useEffect(() => {
		if (gameover) setIsPlaying(false);
	}, [gameover]);

	return (
		<>
			<div className={'intro-wrapper ' + animationClasses[animationIndex]}>
				<h1 title='Colorful'>Colorful</h1>
				<h1 title='Night'>Night</h1>
			</div>

			{showDesc && (
				<div id='intro-desc'>
					<p>Dive into the world of a colorful night.</p>
					<p>
						You are the magician of lights, and you are the one that can restore
						brilliance to the darkness. <br />
						Your power? Play a combination of hand gestures to create a unique
						sky of fireworks.
					</p>

					<p>
						Colorful Night is an interactive game based on motion detection.
					</p>
					<Button onClick={handleClick1} id='intro1'>
						Ready to play
					</Button>
				</div>
			)}
			{showTutVid && (
				<div
					id={'video-wrapper'}
					className={animationIndex == 2 && 'fade-video'}
				>
					<Button onClick={handleClick2} delay={0}>
						Start Game !
					</Button>
					<video src={tutorialVid} autoPlay={true} loop={true} />
				</div>
			)}
			<Sound isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
		</>
	);
};

export default Intro;

const animationClasses = ['fade', 'navbar', 'navbar'];
