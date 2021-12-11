import loadingIcon from '../../assets/loading200px.svg';

const Card = ({
	children,
	title,
	subtitle,
	compClass,
	bg,
	blur,
	isLoading,
}) => {
	return (
		<div className={`flex z-10 justify-end ${compClass}`}>
			<div
				className={`p-12 bg-${bg ? bg : 'white'} ${
					blur && 'bg-blur'
				} rounded-2xl w-100 shadow-lg relative overflow-hidden`}
				style={{ maxHeight: '80vh' }}>
				<div className='mb-4'>
					<h3 className='font-semibold text-2xl text-gray-800'>
						{title}
					</h3>
					<p className='text-gray-500'>{subtitle}</p>
				</div>
				<div
					className={'rounded-lg'}
					style={{ maxHeight: '93%', overflow: 'auto' }}>
					{children}
				</div>
				{isLoading && (
					<div className='loading-overlay | w-full h-full | flex justify-center items-center | absolute z-10 top-0 left-0 | bg-white bg-opacity-50'>
						<img src={loadingIcon} alt='Loading' className='w-12' />
					</div>
				)}
			</div>
		</div>
	);
};

export default Card;
