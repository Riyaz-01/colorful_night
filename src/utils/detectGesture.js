import fp from 'fingerpose';

const detectGesture = (hands = [], confidence = 9) => {
	if (hands.length === 0) {
		console.warn('No hand detected');
		return null;
	}
	const GE = new fp.GestureEstimator([
		fp.Gestures.VictoryGesture,
		...customGestures,
	]);

	const gesture = GE.estimate(hands[0].landmarks, confidence);

	return gesture;
};

export default detectGesture;

const okGesture = new fp.GestureDescription('OkGesture');
okGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
okGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.8);
okGesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
okGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 0);
okGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
okGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
okGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
okGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1.0);
okGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
okGesture.addDirection(
	fp.Finger.Middle,
	fp.FingerDirection.DiagonalUpLeft,
	1.0
);
okGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);
okGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 1.0);

// Define custom gesture for "Fist"
const fistGesture = new fp.GestureDescription('FistGesture');
fistGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
fistGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
fistGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
fistGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
fistGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
fistGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

// Define custom gesture for "Pointing"
const pointingGesture = new fp.GestureDescription('PointingGesture');
pointingGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 0.8);
pointingGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
pointingGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
pointingGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
pointingGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
pointingGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
pointingGesture.addDirection(
	fp.Finger.Index,
	fp.FingerDirection.VerticalUp,
	1.0
);
pointingGesture.addDirection(
	fp.Finger.Index,
	fp.FingerDirection.DiagonalUpLeft,
	0.8
);
pointingGesture.addDirection(
	fp.Finger.Index,
	fp.FingerDirection.DiagonalUpRight,
	0.8
);

// Define custom gesture for "Spread Fingers"
const spreadFingersGesture = new fp.GestureDescription('SpreadFingersGesture');
spreadFingersGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
spreadFingersGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
spreadFingersGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
spreadFingersGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
spreadFingersGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

// Thumbs up
const thumbUpGesture = new fp.GestureDescription('thumbUpGesture');
thumbUpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
thumbUpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.8);
thumbUpGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
thumbUpGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
thumbUpGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
thumbUpGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
thumbUpGesture.addDirection(
	fp.Finger.Thumb,
	fp.FingerDirection.VerticalUp,
	1.0
);
thumbUpGesture.addDirection(
	fp.Finger.Thumb,
	fp.FingerDirection.DiagonalUpLeft,
	0.8
);
thumbUpGesture.addDirection(
	fp.Finger.Thumb,
	fp.FingerDirection.DiagonalUpRight,
	0.8
);

// Four Fingers
const fourFingerGesture = new fp.GestureDescription('fourFinger');
fourFingerGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1);
fourFingerGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1);
fourFingerGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1);
fourFingerGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1);
fourFingerGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1);

const customGestures = [
	okGesture,
	fistGesture,
	pointingGesture,
	spreadFingersGesture,
	thumbUpGesture,
	fourFingerGesture,
];
