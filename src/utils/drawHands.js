const connections = [
	[0, 1],
	[1, 2],
	[2, 3],
	[3, 4],
	[2, 5],
	[5, 6],
	[6, 7],
	[7, 8],
	[5, 9],
	[9, 10],
	[10, 11],
	[11, 12],
	[9, 13],
	[13, 14],
	[14, 15],
	[15, 16],
	[13, 17],
	[17, 18],
	[18, 19],
	[19, 20],
	[0, 17],
];

export const drawhands = (canvas, hands) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return; // Guard against null context

	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
	ctx.strokeStyle = 'cyan';
	ctx.fillStyle = 'cyan'; // Added for joints visibility
	ctx.lineCap = 'round';
	ctx.lineWidth = 28;

	if (!hands || hands.length === 0) return;

	hands.forEach((hand) => {
		// Draw connections
		connections.forEach((connection) => {
			const [x1, y1] = hand.landmarks[connection[0]];
			const [x2, y2] = hand.landmarks[connection[1]];
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke(); // Ensure connections are stroked
		});
	});
};

export default drawhands;
