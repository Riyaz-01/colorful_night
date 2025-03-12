import React, { useEffect, useRef } from 'react';
import './Fireworks.scss';

const Fireworks = ({
	showFireworks = false,
	duration = 600,
	minRadius = 2,
	maxRadius = 4,
	volume = 0.7, // Volume control (0-1)
	soundPath = '/sounds/fireworks.mp3', // Path to your single firework sound file
}) => {
	const canvasRef = useRef(null);
	const particlesRef = useRef([]);
	const requestIdRef = useRef(null);
	const timerRef = useRef(null);
	const audioRef = useRef(null);

	// Initialize audio element once
	useEffect(() => {
		// Create audio element for firework sound
		const audio = new Audio(soundPath);
		audio.volume = volume;
		// Some browsers have autoplay restrictions, so we set this to true
		audio.preload = 'auto';
		audioRef.current = audio;

		return () => {
			// Clean up audio
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.src = '';
			}
		};
	}, [soundPath, volume]);

	// Function to play the firework sound
	const playFireworkSound = () => {
		if (!audioRef.current) return;

		// Clone the audio element to allow multiple simultaneous plays
		const soundClone = audioRef.current.cloneNode();

		// Play the sound
		soundClone.play().catch((error) => {
			// This usually happens due to browser autoplay restrictions
			console.warn('Could not play firework sound:', error);
		});

		// Clean up the clone after it finishes playing
		soundClone.onended = () => {
			soundClone.remove();
		};
	};

	// Firework particle class
	class Particle {
		constructor(x, y, color) {
			this.x = x;
			this.y = y;
			this.color = color;
			this.radius = Math.random() * (maxRadius - minRadius) + minRadius;
			this.velocity = {
				x: (Math.random() - 0.5) * 8,
				y: (Math.random() - 0.5) * 8,
			};
			this.gravity = 0.05;
			this.friction = 0.95;
			this.alpha = 1;
			this.decay = Math.random() * 0.03 + 0.015;
			this.life = 100;
		}

		update() {
			this.velocity.y += this.gravity;
			this.velocity.x *= this.friction;
			this.velocity.y *= this.friction;
			this.x += this.velocity.x;
			this.y += this.velocity.y;
			this.alpha -= this.decay;
			this.life--;
			return this.life > 0 && this.alpha > 0;
		}

		draw(ctx) {
			ctx.globalAlpha = this.alpha;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	}

	// Create a new firework at a centered position
	const createFirework = (canvas) => {
		// Calculate center area (middle 50% of width and height)
		const centerWidth = canvas.width * 0.5;
		const centerHeight = canvas.height * 0.5;

		// Calculate position within center area
		const x = (canvas.width - centerWidth) / 2 + Math.random() * centerWidth;
		const y =
			(canvas.height - centerHeight) / 2 + Math.random() * centerHeight * 0.8; // Slightly higher in the center

		const particleCount = Math.floor(Math.random() * 100) + 100;
		const colors = [
			'#ff0000',
			'#ffa500',
			'#ffff00',
			'#00ff00',
			'#00ffff',
			'#0000ff',
			'#ff00ff',
			'#ffffff',
		];

		// Create a new firework pattern
		const patternType = Math.floor(Math.random() * 3);
		const color = colors[Math.floor(Math.random() * colors.length)];

		// Play the firework sound
		playFireworkSound();

		for (let i = 0; i < particleCount; i++) {
			const particle = new Particle(x, y, color);

			// Different firework patterns
			switch (patternType) {
				case 0: // Circular
					const angle = Math.random() * Math.PI * 2;
					const speed = Math.random() * 8 + 3;
					particle.velocity.x = Math.cos(angle) * speed;
					particle.velocity.y = Math.sin(angle) * speed;
					break;
				case 1: // Double ring
					const ring = Math.random() > 0.5 ? 1 : 1.5;
					const angle2 = Math.random() * Math.PI * 2;
					const speed2 = (Math.random() * 3 + 5) * ring;
					particle.velocity.x = Math.cos(angle2) * speed2;
					particle.velocity.y = Math.sin(angle2) * speed2;
					break;
				case 2: // Starburst
					const angle3 = (i / particleCount) * Math.PI * 2;
					const variance = Math.random() * 0.5 + 0.75;
					const speed3 = (Math.random() * 3 + 5) * variance;
					particle.velocity.x = Math.cos(angle3) * speed3;
					particle.velocity.y = Math.sin(angle3) * speed3;
					break;
			}

			// Add some randomness
			particle.velocity.x += (Math.random() - 0.5) * 2;
			particle.velocity.y += (Math.random() - 0.5) * 2;

			// Decrease particle velocity slightly to keep them more centered
			particle.velocity.x *= 0.9;
			particle.velocity.y *= 0.9;

			particlesRef.current.push(particle);
		}
	};

	// Animation loop
	const animate = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');

		// Clear the canvas completely to maintain transparency
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Update and draw particles
		particlesRef.current = particlesRef.current.filter((particle) => {
			particle.draw(ctx);
			return particle.update();
		});

		// Generate new fireworks randomly - only if still within duration
		if (Math.random() < 0.03 && showFireworks) {
			createFirework(canvas);
		}

		// Continue animation loop if showing fireworks or particles remain
		if (showFireworks || particlesRef.current.length > 0) {
			requestIdRef.current = requestAnimationFrame(animate);
		} else {
			// Clear canvas once all particles are gone
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
	};

	useEffect(() => {
		// Set up canvas
		const canvas = canvasRef.current;
		if (!canvas) return;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener('resize', resize);
		resize();

		// Add a click handler to the document to trigger audio
		// This helps overcome browsers' autoplay restrictions
		const unlockAudio = () => {
			if (audioRef.current) {
				// Create and play a silent sound to unlock audio
				const silentSound = audioRef.current.cloneNode();
				silentSound.volume = 0.001;
				silentSound.play().catch(() => {});

				// Remove this event listener after first interaction
				document.removeEventListener('click', unlockAudio);
				document.removeEventListener('touchstart', unlockAudio);
			}
		};

		document.addEventListener('click', unlockAudio);
		document.addEventListener('touchstart', unlockAudio);

		// Start or stop animation based on showFireworks prop
		if (showFireworks) {
			// Clear any existing timer
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}

			// Start fireworks
			if (!requestIdRef.current) {
				particlesRef.current = [];
				// Create initial fireworks
				for (let i = 0; i < 3; i++) {
					createFirework(canvas);
				}
				requestIdRef.current = requestAnimationFrame(animate);
			}

			// Set timer to stop creating new fireworks after duration
			timerRef.current = setTimeout(() => {
				// Here we set showFireworks to false after the specified duration
				// This will stop new fireworks from being created, but animation will continue
				// until all existing particles fade out
				const event = new CustomEvent('fireworksEnd');
				window.dispatchEvent(event);
			}, duration);
		} else if (requestIdRef.current && particlesRef.current.length === 0) {
			// Stop animation if no particles and showFireworks is false
			cancelAnimationFrame(requestIdRef.current);
			requestIdRef.current = null;

			// Clear canvas
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}

		return () => {
			window.removeEventListener('resize', resize);
			document.removeEventListener('click', unlockAudio);
			document.removeEventListener('touchstart', unlockAudio);
			if (requestIdRef.current) {
				cancelAnimationFrame(requestIdRef.current);
				requestIdRef.current = null;
			}
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		};
	}, [showFireworks, duration, minRadius, maxRadius]);

	return <canvas ref={canvasRef} className='fireworks-canvas' />;
};

export default Fireworks;
