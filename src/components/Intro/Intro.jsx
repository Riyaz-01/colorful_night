import React, { useEffect, useState } from 'react';
import './Intro.scss';

import tutorialVid from '../../assets/tutorial.mov';
import Button from '../Button/Button';

const Intro = () => {
	const [animationIndex, setAnimationIndex] = useState(null);
	const [showDesc, setShowDesc] = useState(false);
	const [showTut, setShowTut] = useState(false);

	const handleClick1 = () => {
		setShowDesc(false);
		setShowTut(true);
	};
	const handleClick2 = () => {
		setAnimationIndex(2);
		setTimeout(() => {
			setShowTut(false);
			setAnimationIndex(1);
		}, 500);
	};

	const startAnimations = () => {
		setTimeout(() => setAnimationIndex(0), 1000);
		setTimeout(() => setAnimationIndex(1), 2000);
		setTimeout(() => setShowDesc(true), 3000);
	};

	useEffect(() => {
		startAnimations();
	}, []);
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
					<Button onClick={handleClick1}>Ready to play</Button>
				</div>
			)}
			{showTut && (
				<div
					id={'video-wrapper'}
					className={animationIndex == 2 && 'fade-video'}
				>
					<Button onClick={handleClick2} delay={0}>
						Ready to play !
					</Button>
					<video src={tutorialVid} autoPlay={true} loop={true} />
				</div>
			)}
		</>
	);
};

export default Intro;

const animationClasses = ['fade', 'navbar', 'navbar'];
