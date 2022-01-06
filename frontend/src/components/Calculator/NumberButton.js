function NumberButton({
	value,
	color,
	onClickNumber,
	colSpan,
	onClickAccept,
	submitDisabled,
}) {
	return (
		<button
			className={
				'number-button p-3 font-bold text-xl rounded-xl border border-solid text-center bg-white bg-opacity-70 active:bg-gradient-to-br active:text-white' +
				(submitDisabled
					? ' opacity-30 cursor-default'
					: ' hover:shadow') +
				(colSpan ? ` col-span-${colSpan}` : '') +
				(color
					? ` border-${color} text-${color} from-${color} to-${color}-dark`
					: ' border-blue text-blue from-blue to-blue-dark')
			}
			onClick={onClickAccept ? onClickAccept : onClickNumber}
			disabled={submitDisabled}
			data-testid='number-button'>
			{value}
		</button>
	);
}

export default NumberButton;
