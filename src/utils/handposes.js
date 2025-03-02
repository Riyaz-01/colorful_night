export const handposeIcons = ['✌️', '👍', '👌', '✊', '🖐️', '☝️', '👎'];

export const gestureNames = [
	'victory',
	'thumbUpGesture',
	'okGesture',
	'fistGesture',
	'spreadFingersGesture',
	'pointingGesture',
	'thumbDownGesture',
];

export const handposeIds = {
	[handposeIcons[0]]: gestureNames[0],
	[handposeIcons[1]]: gestureNames[1],
	[handposeIcons[2]]: gestureNames[2],
	[handposeIcons[3]]: gestureNames[3],
	[handposeIcons[4]]: gestureNames[4],
	[handposeIcons[5]]: gestureNames[5],
	[handposeIcons[6]]: gestureNames[6],
};

export const getRandomPoseIcon = () => {
	const index = Math.floor(Math.random() * handposeIcons.length);
	return handposeIcons[index];
};

export default handposeIcons;
