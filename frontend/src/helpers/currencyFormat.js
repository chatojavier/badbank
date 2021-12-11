const currencyFormat = (num) => {
	const fixedNumber = (Math.round(num * 100) / 100).toFixed(2);
	return String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default currencyFormat;
