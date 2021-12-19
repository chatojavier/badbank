import PageContainer from '../../components/PageContainer';

const Page404 = () => {
	return (
		<PageContainer>
			<div className='body-text text-right mr-12'>
				<div className='font-brand text-7xl'>ERROR 404</div>
				<div className='text-2xl'>Oops! That page can't be found</div>
			</div>
		</PageContainer>
	);
};

export default Page404;
