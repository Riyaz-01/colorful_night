import React, { useState, useRef, useEffect } from 'react';
import './NameInput.scss';
import StreamButton from '../StreamButton/StreamButton';

const NameInput = ({ onSubmit }) => {
	const [name, setName] = useState(['', '', '', '']);
	const inputRefs = useRef([]); // Refs for each input field

	const handleChange = (index, value) => {
		if (value.length <= 1) {
			const newName = [...name];
			newName[index] = value.toUpperCase();
			setName(newName);

			// Move focus to the next input if a character is entered
			if (value && index < 3) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		// Handle backspace to move to previous input
		if (e.key === 'Backspace' && !name[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = () => {
		const fullName = name.join('');
		if (fullName.length === 4) {
			onSubmit(fullName);
		} else {
			alert('Please fill all 4 boxes');
		}
	};

	// Focus the first input on mount
	useEffect(() => {
		inputRefs.current[0].focus();
	}, []);

	return (
		<div className='name-input-container'>
			<div className='input-group'>
				{name.map((char, index) => (
					<input
						key={index}
						type='text'
						value={char}
						onChange={(e) => handleChange(index, e.target.value)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						maxLength={1}
						className='name-input'
						ref={(el) => (inputRefs.current[index] = el)}
					/>
				))}
			</div>
			<StreamButton onClick={handleSubmit}>Submit</StreamButton>
		</div>
	);
};

export default NameInput;
