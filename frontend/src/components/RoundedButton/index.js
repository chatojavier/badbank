export default function ButtonRounded({
	children,
	compClass,
	isActive,
	color,
	onClick,
	type,
	isDisabled,
}) {
	return (
		<button
			className={
				'uppercase text-xs py-1 px-3 font-semibold rounded-full border border-solid text-center active:bg-gradient-to-br active:text-white ' +
				(color === 'blue'
					? `bg-gradient-to-br text-white from-blue to-blue-dark border-blue `
					: ' border-blue text-blue from-blue to-blue-dark ') +
				(compClass ? compClass : '') +
				(isDisabled
					? ' opacity-50 cursor-default'
					: ' hover:border-white')
			}
			onClick={onClick && (() => onClick())}
			type={type}
			disabled={isDisabled}>
			{children}
		</button>
	);
}
