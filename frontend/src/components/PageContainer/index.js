import useUrlApi from '../../hooks/useUrlApi';
import loadingIcon from '../../assets/loading200px.svg';
import errorImg from '../../assets/david-ress-lvowu4IK6Mc-unsplash.jpg';
import PageContent from '../PageContent';

const PageContainer = ({ children }) => {
	const [imgState] = useUrlApi(
		'https://source.unsplash.com/1920x1080/?architecture',
		''
	);
	return (
		<>
			<div className='page-container bg-no-repeat bg-center w-full absolute top-0 -z-10 flex justify-center items-center h-full'>
				{imgState.isLoading && !imgState.isError ? (
					<img src={loadingIcon} alt='Loading' className='w-12' />
				) : (
					<img
						src={imgState.data}
						alt='Architecture'
						className='absolute h-full w-full top-0 object-cover z-0'
					/>
				)}
				{imgState.isError && (
					<img
						src={errorImg}
						alt='Error'
						className='absolute h-full w-full top-0 object-cover z-0'></img>
				)}
				{(window.location.hash === '#/' || !window.location.hash) && (
					<div className='bg-white bg-opacity-25 absolute w-full h-full top-0'></div>
				)}
			</div>
			<PageContent>{children}</PageContent>
		</>
	);
};

export default PageContainer;
