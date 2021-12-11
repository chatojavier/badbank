import loadingIcon from '../../assets/loading200px.svg';
const LoadingScreen = () => {
	return (
		<div className='page-container bg-no-repeat bg-center w-full absolute top-0 -z-10 flex justify-center items-center h-full'>
			<img src={loadingIcon} alt='Loading' className='w-12' />
		</div>
	);
};
export default LoadingScreen;
