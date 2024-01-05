const selectLoadingText = (text = '') => {
	switch (text) {
		case 'Loading .':
			return 'Loading . .';
		case 'Loading . .':
			return 'Loading . . .';
		case 'Loading . . .':
			return 'Loading .';
	}
};

export default selectLoadingText;
