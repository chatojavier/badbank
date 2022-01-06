import PageContainer from '../../components/PageContainer';
import Card from '../../components/Card';
import Table from '../../components/Table';
import { useGetDataApi } from '../../hooks/useDataApi';
import loadingIcon from '../../assets/loading200px.svg';

const AllData = () => {
	const url = '/account/all';
	const [dataUser] = useGetDataApi(url, []);

	const cols = [
		{
			header: 'UID',
			accessor: 'uid',
		},
		{
			header: 'Name',
			accessor: 'name',
		},
		{
			header: 'Email',
			accessor: 'email',
		},
		{
			header: 'Balance',
			accessor: 'balance',
		},
		{
			header: 'Deposits',
			accessor: 'deposits',
		},
		{
			header: 'Withdraws',
			accessor: 'withdraws',
		},
	];
	const data = dataUser.data;
	return (
		<PageContainer>
			<Card title='All Data' compClass='w-full' blur={true}>
				{dataUser.isLoading && !dataUser.isError ? (
					<img src={loadingIcon} alt='Loading' className='w-12' />
				) : (
					<Table columns={cols} rows={data} />
				)}
				{dataUser.isError && (
					<span className='error-messange'>
						It was a problem loading the info
					</span>
				)}
			</Card>
		</PageContainer>
	);
};

export default AllData;
